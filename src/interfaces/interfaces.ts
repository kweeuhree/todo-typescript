export interface TodoInterface {
    id: number;
    body: string;
    status: boolean;
    date: string;
}

export interface TodoProps {
    todo: TodoInterface;
    toggleStatus: (id: number) => void; 
  }

export interface CriterionInterface {
    status?: string,
    date?: string,
}