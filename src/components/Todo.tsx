import React from 'react';
//import interfaces
import { TodoProps } from '../interfaces/interfaces';
// import helper function
import { formatDate } from '../utils/helpers';
//  import material ui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const Todo: React.FC<TodoProps> = ({ todo, toggleStatus, manipulateTodo }) => {

    const handleCheckboxChange: () => void = () => {
        toggleStatus(todo.ID);
    }

    const manipulateHandler = (action: string) => {
      manipulateTodo(action, todo);
    }

  return (
    <>
         <tr className='left-align'>
           <td>{todo.Body}</td>
         </tr>

        <tr> 
          <td>{formatDate(todo.Created)}</td>
        </tr>

        <tr>
          <td>
            <input 
              className='cursor-pointer' 
              type="checkbox" 
              onChange={handleCheckboxChange} 
              checked={ todo.Status ? true : false } 
            />
          </td>
        </tr>

        <tr> 
          <td 
            className='cursor-pointer' 
            onClick={ ()=> manipulateHandler('edit') }
            >
            <EditIcon />
          </td>
        </tr>

        <tr> 
        <td 
          className='cursor-pointer' 
          onClick={ ()=> manipulateHandler('delete') }
          >
            <DeleteForeverIcon />
          </td>
        </tr>
    </>
  )
}

export default Todo;