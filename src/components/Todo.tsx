import React, { useContext} from 'react';
//import interfaces
import { TodoProps } from '../interfaces/interfaces';
// import helper function
import { formatDate } from '../utils/helpers';
//  import material ui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
// import context
import { TodoContext } from '../context/todo-context';


const Todo: React.FC<TodoProps> = ({ todo }) => {

  const { userState, toggleStatus, manipulateTodo } = useContext(TodoContext);

    const handleCheckboxChange: () => void = () => {
      userState.isAuthenticated && toggleStatus(todo.ID);
    }

    const manipulateHandler = (action: string) => {
      manipulateTodo(action, todo);
    }
    const renderActionIcon = (action: string, Icon: React.ReactNode) => (
      userState.isAuthenticated && (
         <tr>
           <td className='cursor-pointer' onClick={() => manipulateHandler(action)}>
              {Icon}
           </td>
         </tr>
      )
  );

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

          {renderActionIcon('edit', <EditIcon />)}
          {renderActionIcon('delete', <DeleteForeverIcon />)}
      </>
  );
}

export default Todo;