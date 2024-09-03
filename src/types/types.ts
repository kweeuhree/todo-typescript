import { TodoInterface } from "../interfaces/interfaces";

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

export interface Form {
  email: string,
  password: string,
  Flash?: string,
  }

export type SignUpForm = Form & {
  name: string,
}

export type LoginForm = Form & {
  uuid: string,
  csrfToken: string,
}

// Define a type for user reducer actions
export type UserAction =
  | { type: 'SIGNUP'; payload: SignUpForm }
  | { type: 'LOGIN'; payload: LoginForm }
  | { type: 'LOGOUT'}
  | { type: 'ERROR'; payload: string }
  | { type: 'CSRF_TOKEN'; payload: string };
