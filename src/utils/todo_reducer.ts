import { Action } from '../types/types';
import { TodoInterface } from '../interfaces/interfaces';
import { filterStatus } from './helpers';

export const initialState = {
    todos: [] as TodoInterface[],
    error: '',
  };
  
  type State = typeof initialState;

  export function reducerTodo(state: State, action: Action): State {
    switch (action.type) {
      case 'INITIALIZE':
        return {
          ...state,
          todos: action.payload,
        };
      case 'CREATE':
        return {
          ...state,
          todos: [action.payload, ...state.todos],
        };
      case 'UPDATE':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.ID === action.payload.ID ? { ...todo, Body: action.payload.Body } : todo
          ),
        }; 
      case 'DELETE':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.ID !== action.payload.ID),
        };
      case 'TOGGLE_STATUS':
        return {
            ...state,
            todos: filterStatus(state.todos, action.payload),
        };
      case 'SORT':
        return {
            ...state, 
            todos: action.payload 
         }
      case 'FILTER':
         return {
            ...state, 
            todos: action.payload 
         }
    
      case 'ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        throw new Error('Unknown action type');
    }
  }
  