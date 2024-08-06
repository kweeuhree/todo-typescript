import { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import components
import TodoTable from './components/TodoTable'
// import fetching and helper logic
import { get } from './utils/fetchTodos';
import { filterStatus, sort, filter } from './utils/helpers';
// import interfaces and types
import { TodoInterface } from './interfaces/interfaces';
import { SortStateKey } from './types/types'
import './App.css';



function App() {
  //set states for: todos; edit
  //add useEffect to fetch todos once
  // display all todos or Loading
  // display a Todo component 
  // add CRUD functionality
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [sortState, setSortState] = useState<Record<SortStateKey, boolean>>({
    title: false,
    date: false,
    check: false,
  });
  // const [edit, setEdit] = useState<boolean>(false);
  
  //fetch todos
  const getTodos:() => void = async () => {
      try {
        const newTodos: TodoInterface[] = await get();
        setTodos(newTodos);
      } catch (error) {
        alert('Something went wrong');
      }
    }

  useEffect(() => {
    getTodos();
  }, [])

  const toggleStatus = (todoId: number): void => {
    const updatedTodos: TodoInterface[] = filterStatus(todos, todoId);
    setTodos(updatedTodos);
  }

  const verifyAction = (action: SortStateKey) => {
    setSortState((prev) => ({
      ...prev,          
      [action]: !prev[action] 
    }));

    return `${action} ${sortState[action]}`;
  }

  const sortTodos = async (action: SortStateKey) => {
    const verifiedAction = verifyAction(action);
    const sortedTodos = await sort(todos, verifiedAction);
    setTodos(sortedTodos);
  }

  const filterTodos: (criterion: object) => void = async (criterion) => {
    const filteredTodos: TodoInterface[] = await filter(criterion);
    setTodos(filteredTodos);
  }

  const displayDefault = () => {
    getTodos();
  }

  return (
    <>
      { !todos ? (
        <p>Loading...</p>
      ) : (
        <TodoTable todos={todos} toggleStatus={toggleStatus} sortTodos={sortTodos} filterTodos={filterTodos} displayDefault={displayDefault} />
      )}
    </>
  )
}

export default App;
