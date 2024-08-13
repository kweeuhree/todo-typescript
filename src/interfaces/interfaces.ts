export interface TodoInterface {
    id: number;
    body: string;
    status: boolean;
    date: string;
}

export interface TodoProps {
    todo: TodoInterface;
    toggleStatus: (id: number) => void; 
    manipulateTodo: (action: string, todo: TodoInterface) => void,
  }

export interface CriterionInterface {
    status?: string,
    date?: string,
}

export interface FormData {
    [key: string]: string;
  }