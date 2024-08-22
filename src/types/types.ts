import { TodoInterface } from "../interfaces/interfaces";

// Define a type for the keys of sortState
export type SortStateKey = 'title' | 'date' | 'check';

// Define a type for reducer actions
export type Action =
  | { type: 'INITIALIZE'; payload: TodoInterface[] }
  | { type: 'ERROR'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string }
  | { type: 'SORT'; payload: TodoInterface[] }
  | { type: 'FILTER'; payload: TodoInterface[] }
  | { type: 'CREATE'; payload: TodoInterface }
  | { type: 'UPDATE'; payload: TodoInterface }
  | { type: 'DELETE'; payload: TodoInterface };
