import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const TodoContext = createContext();

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
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired
};

function useTodo() {
  const context = useContext(TodoContext);

  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  const { state, dispatch } = context;

  const addTodo = useCallback((text) => dispatch({ type: 'ADD_TODO', payload: text }), [dispatch]);

  const removeTodo = useCallback((id) => dispatch({ type: 'REMOVE_TODO', payload: id }), [dispatch]);

  const completeTodo = useCallback((id) => dispatch({ type: 'COMPLETE_TODO', payload: id }), [dispatch]);

  const selectFilter = useCallback((filterId) => dispatch({ type: 'SELECT_FILTER', payload: filterId }), [dispatch]);

  return {
    todos: state.todos.filter(state.filters.find((filter) => filter.id === state.filter).predicate),
    filters: state.filters,
    addTodo,
    removeTodo,
    completeTodo,
    selectFilter
  };
}

export { TodoProvider, useTodo };
