import { todos } from '../data/sampleData';
import { TodoInterface } from '../interfaces/interfaces';

export const get = async (): Promise<TodoInterface[]> => {
    // get todos
    try {
        const response: TodoInterface[] = todos;
        return response;
        
    } catch (error) {
        throw new Error("Failed fetching todos");
    }
    
};