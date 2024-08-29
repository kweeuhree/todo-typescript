//import components
import Todo from './Todo';
import TableHeads from './TableHeads';
import FilterComponent from './FilterComponent';
//import interfaces
import { TodoInterface, CriterionInterface } from '../interfaces/interfaces';
import { SortStateKey } from "../types/types";

type Props = {
    todos: TodoInterface[],
    toggleStatus: (id: string) => void,
    sortTodos: (head: SortStateKey) => void, 
    filterTodos: (criterion: CriterionInterface) => void,
    displayDefault: () => void;
    manipulateTodo: (action: string, todo: TodoInterface) => void,
    userState: object,
}

const TodoTable = ({ todos, toggleStatus, sortTodos, filterTodos, displayDefault, manipulateTodo, userState} : Props) => {
  return (
    <>
    <div className='flex-container space-around'>
      <FilterComponent filterTodos={filterTodos}/>
      <button onClick={() => displayDefault()}>See all todos</button>
    </div>
    <table>
        <tbody className={userState.isAuthenticated ? 'columns5' : 'columns3'}>
        <TableHeads userState={userState} sortTodos={sortTodos}/>
    
        {todos?.map((t) => (
        <Todo key={t.ID} todo={t} userState={userState} toggleStatus={toggleStatus} manipulateTodo={manipulateTodo}/>
        ))}
        </tbody>
    </table>
    </>
  )
}

export default TodoTable;