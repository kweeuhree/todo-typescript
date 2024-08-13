//import components
import Todo from './Todo';
import TableHeads from './TableHeads';
import FilterComponent from './FilterComponent';
//import interfaces
import { TodoInterface, CriterionInterface } from '../interfaces/interfaces';

type Props = {
    todos: TodoInterface[],
    toggleStatus: (id: number) => void,
    sortTodos: (head: string) => void, 
    filterTodos: (criterion: CriterionInterface) => void,
    displayDefault: () => void;
    manipulateTodo: (action: string, todo: TodoInterface) => void,
}

const TodoTable = ({ todos, toggleStatus, sortTodos, filterTodos, displayDefault, manipulateTodo} : Props) => {
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
        <Todo key={t.id} todo={t} toggleStatus={toggleStatus} manipulateTodo={manipulateTodo}/>
        ))}
        </tbody>
    </table>
    </>
  )
}

export default TodoTable;