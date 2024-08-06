//import components
import Todo from './Todo';
import TableHeads from './TableHeads';
import FilterComponent from './FilterComponent';
//import interfaces
import { TodoInterface } from '../interfaces/interfaces';
import { SortStateKey } from "../types/types";

type Props = {
    todos: TodoInterface[],
    toggleStatus: (id: number) => void,
    sortTodos: (head: SortStateKey) => void, 
    filterTodos: (criterion: object) => void,
    displayDefault: () => void;
}

const TodoTable = ({ todos, toggleStatus, sortTodos, filterTodos, displayDefault} : Props) => {
  return (
    <>
    <div className='flex-container space-around'>
      <FilterComponent filterTodos={filterTodos}/>
      <button onClick={() => displayDefault()}>See all todos</button>
    </div>
    <table>
        <tbody>
        <TableHeads sortTodos={sortTodos}/>
    
        {todos.map((t) => (
        <Todo key={t.id} todo={t} toggleStatus={toggleStatus} />
        ))}
        </tbody>
    </table>
    </>
  )
}

export default TodoTable;