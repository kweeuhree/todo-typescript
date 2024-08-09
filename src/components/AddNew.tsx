import React, { useState } from 'react';

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
        <p>Add New To Do</p>
        <form onSubmit={handleSubmit}>
            <input type='text' name="body" value={formData.body} onChange={handleChange} required />
            <input type='submit' value="Submit"/>
        </form>
    </div>
  )
}

export default AddNew;