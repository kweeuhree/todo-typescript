//import components
import Todo from './Todo';
import TableHeads from './TableHeads';
import FilterComponent from './FilterComponent';
//import interfaces
import { TodoInterface, CriterionInterface } from '../interfaces/interfaces';
import { SortStateKey } from "../types/types";

type Props = {
    todos: TodoInterface[],
    toggleStatus: (id: number) => void,
    sortTodos: (head: SortStateKey) => void, 
    filterTodos: (criterion: CriterionInterface) => void,
    displayDefault: () => void;
}

const TodoTable = ({ todos, toggleStatus, sortTodos, filterTodos, displayDefault} : Props) => {
  console.log(todos, 'todos in table')
  console.log('are todos an array?', Array.isArray(todos));
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
    {/* add new todo */}
    </>
  )
}

export default TodoTable;