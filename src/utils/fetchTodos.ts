// import { todos } from '../data/sampleData';
// import { TodoInterface } from '../interfaces/interfaces';

export const get = async () => {
    // get todos
    try {
        console.log('Fetching todos...');
        const response = await fetch(`/api/`);

        if (response.ok) {
            try {
                const jsonData = await response.json();
                console.log(jsonData, 'todos fetched from server');
                return jsonData;
            } catch (jsonError) {
                console.error('Error parsing JSON:', jsonError);
                throw new Error('Failed to parse JSON');
            }
        } else {
            console.error('Response not OK:', response.statusText);
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Failed fetching todos:', error);
        throw error; // Rethrow error to handle it further up the call chain if needed
    }
    
};

export const create = async (todoBody: string) => {
    try {
        console.log('Attempting posting a new todo...');
        const response = await fetch(`/api/todo/create`, {
            method: 'POST',
            body: todoBody,
        })
        if(response.ok) {
            const jsonData = await response.json();
            console.log(jsonData, 'created todo');
            return jsonData; 
        }
    } catch (error) {
        throw new Error('Failed posting new todo');
    }
}