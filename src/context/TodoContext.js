import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

const TodoContext = createContext();

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
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
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

  return {
    todos: state.todos,
    addTodo,
    removeTodo,
    completeTodo
  };
}

export { TodoProvider, useTodo };
