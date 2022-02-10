import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const TodoStateContext = createContext();
const TodoUpdaterContext = createContext();

const initialState = {
  todos: [],
  filters: [
    {
      id: 'all',
      name: 'All',
      predicate: () => true
    },
    {
      id: 'completed',
      name: 'Completed',
      predicate: (todo) => todo.completed
    },
    {
      id: 'uncompleted',
      name: 'Uncompleted',
      predicate: (todo) => !todo.completed
    }
  ],
  filter: 'all'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const todo = {
        id: state.todos.length,
        text: action.payload,
        completed: false
      };
      return {
        ...state,
        todos: [...state.todos, todo]
      };
    }
    case 'REMOVE_TODO': {
      const todos = state.todos.filter((todo) => todo.id !== action.payload);
      return {
        ...state,
        todos
      };
    }
    case 'COMPLETE_TODO': {
      const todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
      return {
        ...state,
        todos
      };
    }
    case 'SELECT_FILTER': {
      return {
        ...state,
        filter: action.payload
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TodoStateContext.Provider value={value.state}>
      <TodoUpdaterContext.Provider value={value.dispatch}>{children}</TodoUpdaterContext.Provider>
    </TodoStateContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

function useTodoState() {
  const context = useContext(TodoStateContext);

  if (context === undefined) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }

  const state = context;

  return {
    filters: state.filters,
    todos: state.todos.filter(state.filters.find((filter) => filter.id === state.filter).predicate)
  };
}

function useTodoUpdater() {
  const context = useContext(TodoUpdaterContext);

  if (context === undefined) {
    throw new Error('useTodoUpdater must be used within a TodoProvider');
  }

  const dispatch = context;

  const addTodo = useCallback((text) => dispatch({ type: 'ADD_TODO', payload: text }), [dispatch]);

  const removeTodo = useCallback((id) => dispatch({ type: 'REMOVE_TODO', payload: id }), [dispatch]);

  const completeTodo = useCallback((id) => dispatch({ type: 'COMPLETE_TODO', payload: id }), [dispatch]);

  const selectFilter = useCallback((filterId) => dispatch({ type: 'SELECT_FILTER', payload: filterId }), [dispatch]);

  return {
    addTodo,
    removeTodo,
    completeTodo,
    selectFilter
  };
}

function useTodo() {
  return {
    ...useTodoState(),
    ...useTodoUpdater()
  };
}

export { TodoProvider, useTodoState, useTodoUpdater, useTodo };
