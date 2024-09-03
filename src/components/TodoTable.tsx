import { useContext } from 'react';
//import components
import Todo from './Todo';
import TableHeads from './TableHeads';
import FilterComponent from './FilterComponent';
// import context
import { TodoContext } from '../context/todo-context';

type Props = {
    displayDefault: () => void;
}

const TodoTable = ( { displayDefault } : Props) => {

  const { userState, todoState } = useContext(TodoContext);

  return (
    <>
    <div className='flex-container space-around'>
      <FilterComponent />
      <button onClick={() => displayDefault()}>See all todos</button>
    </div>
    <table>
        <tbody className={userState.isAuthenticated ? 'columns5' : 'columns3'}>
        <TableHeads />
    
        {todoState.todos?.map((t) => (
             <Todo key={t.ID} todo={t} />
        ))}
        </tbody>
    </table>
    </>
  )
}

export default TodoTable;