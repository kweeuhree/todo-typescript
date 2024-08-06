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
    filterTodos: (todos: TodoInterface[], criterion: string) => void,
}

const TodoTable = ({ todos, toggleStatus, sortTodos, filterTodos} : Props) => {
  return (
    <>
    <FilterComponent filterTodos={filterTodos}/>
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