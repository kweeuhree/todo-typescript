import { TodoInterface, UserInterface } from "../interfaces/interfaces";

// Define a type for the keys of sortState
export type SortStateKey = 'title' | 'date' | 'check';

// Define a type for todo reducer actions
export type TodoAction =
  | { type: 'INITIALIZE'; payload: TodoInterface[] }
  | { type: 'ERROR'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string }
  | { type: 'SORT'; payload: TodoInterface[] }
  | { type: 'FILTER'; payload: TodoInterface[] }
  | { type: 'CREATE'; payload: TodoInterface }
  | { type: 'UPDATE'; payload: TodoInterface }
  | { type: 'DELETE'; payload: TodoInterface };


// Define a type for user reducer actions
export type UserAction =
  | { type: 'SIGNUP'; payload: UserInterface }
  | { type: 'LOGIN'; payload: UserInterface }
  | { type: 'LOGOUT'}
  | { type: 'ERROR'; payload: string }
  | { type: 'CSRF_TOKEN'; payload: string };
  