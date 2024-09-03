import { useContext } from 'react';
// import material ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import interfaces
import { FormData } from '../interfaces/interfaces';
//import hooks
import useFormData from '../hooks/useFormData';
// import context
import { TodoContext } from '../context/todo-context'


const AddNew = () => {
    const { addTodo } = useContext(TodoContext);
    const initialState: FormData = { body: '' };

    const { formData, handleChange, handleSubmit } = useFormData(
        initialState,
        (data) => addTodo(data.body),
    );

  return (
    <div>
        <form className='flex-container' onSubmit={handleSubmit}>
            <TextField className="whiteTextField" id="filled-basic" label="Add New Todo" color="success" variant="filled" type='text' name="body" value={formData.body} onChange={handleChange} required focused />
            <Button type='submit' variant="contained" color="success" >Submit</Button>
        </form>
    </div>
  )
}

export default AddNew;