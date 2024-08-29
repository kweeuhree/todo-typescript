import { Error } from "@mui/icons-material";

export const get = async () => {
    // get todos
    try {
        console.log('Fetching todos...');
        const response = await fetch(`/api`, {
              method: 'GET',
              credentials: 'include'
        });

        if (response.ok) {
                const jsonData = await response.json();
                console.log('Todos are fetched from server...');
                return jsonData;
        }
    } catch (error) {
        console.error('Failed fetching todos:', error);
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
export const update = async (todoID: string, todoBody: string) => {
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
        throw new Error('Failed updating todo.');
    }
}

// toggle status
export const toggleTodoStatus = async (todoId: string) => {
    try {
        const response = await fetch(`/api/todo/toggle-status/${todoId}`, {
            method: "PUT"
        })
        if(response.ok) {
            console.log('Status toggled successfully');
            return true;
        }
    } catch(error) {
        throw new Error('Failed toggling status');
    }
}

// delete
export const deleteTodo = async (todoId: string) => {
    console.log("Attempting deleting a todo...");
    try {
        const response = await fetch(`/api/todo/delete/${todoId}`, {
            method: 'DELETE'
        })
        if(response.ok) {
            console.log('Deleted successfully');
        }
    } catch(error) {
        throw new Error('Failed deleting a todo');
    }
}