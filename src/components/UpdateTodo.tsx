import { SetStateAction, Dispatch, useRef, useEffect } from 'react';
// import hooks
import useFormData from '../utils/useFormData';
//import interfaces
import { FormData } from '../interfaces/interfaces';
// import material ui 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import interfaces and types
import { TodoInterface } from '../interfaces/interfaces';
import { TodoAction } from '../types/types'
//  import backend functions
import { update } from '../utils/fetchTodos';


type Props = {
    todo: TodoInterface,
    setEdit: Dispatch<SetStateAction<TodoInterface | null>>,
    dispatch: Dispatch<TodoAction>,
}

const UpdateTodo = ({ todo, setEdit, dispatch }: Props) => {
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
        const updatedTodo = await update(todo.ID, newTodo);
        if(updatedTodo) {
            
            todo.Body = updatedTodo.body;
            dispatch({ type: 'UPDATE', payload: todo })
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