import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {
    addTodo: (newTodo: string) => void;
}

const AddNew = ({ addTodo } : Props) => {

    const [formData, setFormData] = useState({
        body: '',
    });

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev, 
            [target.name]: target.value
        }))
    }
    

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData, 'target value in form');
        addTodo(formData.body);
        setFormData({body: ''});
    }

  return (
    <div>
        <form className='flex-container' onSubmit={handleSubmit}>
            <TextField id="filled-basic" label="Add New Todo" color="success" variant="filled" type='text' name="body" value={formData.body} onChange={handleChange} required focused />
            <Button type='submit' variant="contained" color="success" >Submit</Button>
        </form>
    </div>
  )
}

export default AddNew;