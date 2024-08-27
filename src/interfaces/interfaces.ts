export interface TodoInterface {
    ID: string;
    Body: string;
    Status: boolean;
    Created: string;
}

export interface TodoProps {
    todo: TodoInterface;
    toggleStatus: (id: string) => void; 
    manipulateTodo: (action: string, todo: TodoInterface) => void,
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
  csrf_token: string;
}