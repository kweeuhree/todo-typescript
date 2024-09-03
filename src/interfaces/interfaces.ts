import { SortStateKey, TodoAction, UserAction } from "../types/types";
import { UserState } from "../reducer/user_reducer";
import { TodoState } from "../reducer/todo_reducer";
import { Dispatch } from "react";

export interface TodoInterface {
    ID: string;
    Body: string;
    Status: boolean;
    Created: string;
}

export interface TodoProps {
    todo: TodoInterface;
  }

export interface CriterionInterface {
    status?: string,
    date?: string,
}

export interface FormData {
    [key: string]: string;
  }

export interface UserInterface {
  Uuid: string;
  Name: string;
  Email: string;
  csrfToken: string; 
}

export interface TodoContextType {
  todoState: TodoState;
  todoDispatch: Dispatch<TodoAction>;
  getTodos: () => Promise<void>;
  userState: UserState;
  userDispatch: Dispatch<UserAction>;
  userCsrfToken: string;
  sortState: Record<SortStateKey, boolean>;
  setSortState: React.Dispatch<React.SetStateAction<Record<SortStateKey, boolean>>>;
  sortTodos: (action: SortStateKey) => Promise<void>;
  toggleStatus: (todoId: string) => Promise<void>;
  filterTodos: (criterion: CriterionInterface) => Promise<void>;
  addTodo: (newTodoString: string) => Promise<void>;
  manipulateTodo: (action: string, todo: TodoInterface) => Promise<void>;
  edit: TodoInterface | null;
  setEdit: React.Dispatch<React.SetStateAction<TodoInterface | null>>;
}