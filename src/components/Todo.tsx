import React from 'react';
//import interfaces
import { TodoProps } from '../interfaces/interfaces';
//  import material ui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Todo: React.FC<TodoProps> = ({ todo, toggleStatus, manipulateTodo }) => {

    const handleCheckboxChange: () => void = () => {
        toggleStatus(todo.id);
    }

    const manipulateHandler = (action: string) => {
      manipulateTodo(action, todo);
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
          <td>
            <input 
              className='cursor-pointer' 
              type="checkbox" 
              onChange={handleCheckboxChange} 
              checked={ todo.status ? true : false } 
            />
          </td>
        </tr>

        <tr> 
          <td className='cursor-pointer' onClick={ ()=> manipulateHandler('edit') }>
            <EditIcon />
          </td>
        </tr>

        <tr> 
        <td className='cursor-pointer' onClick={ ()=> manipulateHandler('delete') }>
            <DeleteForeverIcon />
          </td>
        </tr>
    </>
  )
}

export default Todo;