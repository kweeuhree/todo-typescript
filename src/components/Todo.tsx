import React from 'react';
//import interfaces
import { TodoProps } from '../interfaces/interfaces';
//  import material ui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Todo: React.FC<TodoProps> = ({ todo, toggleStatus }) => {

    const handleCheckboxChange: () => void = () => {
        toggleStatus(todo.id);
    }

  return (
    <>
         <tr className='left-align'>
           <td>{todo.body}</td>
         </tr>

        <tr> 
          <td>{todo.date}</td>
        </tr>

        <tr>
          <td><input type="checkbox" onChange={handleCheckboxChange} checked={todo.status ? true : false}/></td>
        </tr>

        <tr> 
          <td><EditIcon /></td>
        </tr>

        <tr> 
          <td><DeleteForeverIcon /></td>
        </tr>
    </>
  )
}

export default Todo;