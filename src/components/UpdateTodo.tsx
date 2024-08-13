import { SetStateAction, Dispatch } from 'react';
// import hooks
import useFormData from '../utils/useFormData';
//import interfaces
import { FormData } from '../interfaces/interfaces';
// import material ui 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import interfaces and types
import { TodoInterface } from '../interfaces/interfaces';
import { Action } from '../types/types'


type Props = {
    todo: TodoInterface,
    setEdit: Dispatch<SetStateAction<TodoInterface | null>>,
    dispatch: Dispatch<Action>,
}

const UpdateTodo = ({ todo, setEdit, dispatch }: Props) => {
    const initialState: FormData = { body: todo.body };

    const newTodo = (newTodo: FormData) => {
        todo.body = newTodo.body;
        dispatch({ type: 'UPDATE', payload: todo })
        setEdit(null);
    }

    const { formData, handleChange, handleSubmit } = useFormData(
        initialState,
        (data) => newTodo(data),
    );
  return (
    <div>
        <form className='flex-container' onSubmit={handleSubmit}>
            <TextField 
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