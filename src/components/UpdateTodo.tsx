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
//  import backend functions
import { update } from '../utils/fetchTodos';


type Props = {
    todo: TodoInterface,
    setEdit: Dispatch<SetStateAction<TodoInterface | null>>,
    dispatch: Dispatch<Action>,
}

const UpdateTodo = ({ todo, setEdit, dispatch }: Props) => {
    const initialState: FormData = { body: todo.Body };

    const { formData, handleChange, handleSubmit } = useFormData(
        initialState,
        (data) => newTodo(data),
    );

    const newTodo = async (newTodo: FormData) => {
        console.log(newTodo, 'newTodo to be sent to backend');
        const updatedTodo = await update(todo.ID, newTodo);
        if(updatedTodo) {
            
            todo.Body = updatedTodo.body;
            console.log(todo, 'todo that we`re trying to pass into reducer');
            dispatch({ type: 'UPDATE', payload: todo })
        } 
        setEdit(null);
    }


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
                value={formData.Body} 
                onChange={handleChange} 
                required focused 
            />
            <Button type='submit' variant="contained" color="success" >Submit</Button>
        </form>
    </div>
  )
}

export default UpdateTodo;