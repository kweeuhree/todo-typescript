// import { todos } from '../data/sampleData';
// import { TodoInterface } from '../interfaces/interfaces';

import { TodoInterface } from "../interfaces/interfaces";

export const get = async () => {
    // get todos
    try {
        console.log('Fetching todos...');
        const response = await fetch(`/api`, {
              method: 'GET',
              credentials: 'include'
        });

        if (response.ok) {
            try {
                const jsonData = await response.json();
                console.log('Todos are fetched from server...');
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
        const response = await fetch('/api/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ body: todoBody }), 
            credentials: 'include'
        });
        if(response.ok) {
            const jsonData = await response.json();
            console.log(jsonData, 'created todo');
            return jsonData; 
        }
    } catch (error) {
        throw new Error('Failed posting new todo');
    } 
}

// update
export const update = async (todoID: string, todoBody: FormData) => {
    console.log('Attempting updating a todo with ID...', todoID);
    try {
        const response = await fetch(`/api/todo/update/${todoID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(todoBody)
        }
    )
        if(response.ok) {
            const jsonData = await response.json();
            console.log(jsonData, 'updated todo');
            return jsonData;
        }
    } catch(error) {
        throw new Error('Failed updating todo.')
    }
}

// delete