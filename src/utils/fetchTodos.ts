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

export const create = async (todoBody: string, csrfToken: string) => {
    try {
        console.log('Attempting posting a new todo...');
        const response = await fetch('/api/todo/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": csrfToken  
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
export const update = async (todoID: string, todoBody: string, csrfToken: string) => {
    console.log('Attempting updating a todo with ID...', todoID);
    try {
        const response = await fetch(`/api/todo/update/${todoID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-TOKEN": csrfToken
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
export const toggleTodoStatus = async (todoId: string, csrfToken: string) => {
    try {
        const response = await fetch(`/api/todo/toggle-status/${todoId}`, {
            method: "PUT",
            headers:{
                "X-CSRF-TOKEN": csrfToken
            }
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
export const deleteTodo = async (todoId: string, csrfToken: string) => {
    console.log("Attempting deleting a todo...");
    try {
        const response = await fetch(`/api/todo/delete/${todoId}`, {
            method: 'DELETE',
            headers: {
                "X-CSRF-TOKEN": csrfToken
            }
        })
        if(response.ok) {
            console.log('Deleted successfully');
        }
    } catch(error) {
        throw new Error('Failed deleting a todo');
    }
}