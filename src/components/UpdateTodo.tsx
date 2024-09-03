import { useRef, useEffect, useContext } from 'react';
// import hooks
import useFormData from '../hooks/useFormData';
//import interfaces
import { FormData } from '../interfaces/interfaces';
// import material ui 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import interfaces and types
import { TodoInterface } from '../interfaces/interfaces';
//  import backend functions
import { update } from '../utils/fetchTodos';
//import context 
import { TodoContext } from '../context/todo-context';


type Props = {
    todo: TodoInterface,
}

const UpdateTodo = ({ todo }: Props) => {
    const { setEdit, todoDispatch, userCsrfToken } = useContext(TodoContext);
    const formRef = useRef<HTMLFormElement>(null);

    const initialState: FormData = { body: todo.Body };

    const { formData, handleChange, handleSubmit } = useFormData(
        initialState,
        (data) => newTodo(data),
    );
    useEffect(() => {
        // Focus the first input field inside the form when the component is mounted
        if (formRef.current) {
            formRef.current.querySelector('input')?.focus();
        }
    }, []);


    const newTodo = async (newTodo: string) => {
        const updatedTodo = await update(todo.ID, newTodo, userCsrfToken);
        if(updatedTodo) {
            todo.Body = updatedTodo.body;
            todoDispatch({ type: 'UPDATE', payload: todo })
        } 
        setEdit(null);
    }


  return (
    <div>
        <form ref={formRef} className='flex-container' onSubmit={handleSubmit}>
            <TextField 
                className="whiteTextField"
                id="filled-basic" 
                label="Edit Todo" 
                color="success" 
                variant="filled" 
                type='text' 
                name="body" 
                value={formData.body} 
                onChange={handleChange} 
                required focused 
            />
            <Button type='submit' variant="contained" color="success" >Submit</Button>
        </form>
    </div>
  )
}

export default UpdateTodo;