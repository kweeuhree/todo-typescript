import React from 'react';
//import interfaces
import { TodoProps } from '../interfaces/interfaces';

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
    </>
  )
}

export default Todo;