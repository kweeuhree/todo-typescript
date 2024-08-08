import { useState, useReducer, useEffect } from 'react';
// import reducer function and initial state
import { reducer, initialState } from './utils/reducer'; 
// import components
import TodoTable from './components/TodoTable'
// import fetching and helper logic
import { get } from './utils/fetchTodos';
import { sort, filter } from './utils/helpers';
// import interfaces and types
import { TodoInterface, CriterionInterface } from './interfaces/interfaces';
import { SortStateKey } from './types/types'
import './App.css';

function App() {
  //set states for: todos; edit
  //add useEffect to fetch todos once
  // display all todos or Loading
  // display a Todo component 
  // add CRUD functionality
  const [state, dispatch] = useReducer(reducer, initialState);
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
        dispatch({ type: 'INITIALIZE', payload: newTodos });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: 'Failed to fetch data' });
      }
    }

  useEffect(() => {
    getTodos();
  }, [])

  const toggleStatus = (todoId: number): void => {
    // const updatedTodos: TodoInterface[] = filterStatus(todos, todoId);
    // setTodos(updatedTodos);
    dispatch({ type: 'TOGGLE_STATUS', payload: todoId });
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
    const sortedTodos = await sort(state.todos, verifiedAction);
    // setTodos(sortedTodos);
    dispatch({ type: 'SORT', payload: sortedTodos });
  }

  const filterTodos: (criterion: CriterionInterface) => void = async (criterion) => {
    const filteredTodos: TodoInterface[]  = await filter(criterion);
    dispatch({ type: 'FILTER', payload: filteredTodos });
  }

  const displayDefault = () => {
    getTodos();
  };

  const { todos, error } = state;


  return (
    <>
      {
        error &&
          <p>{error}</p>
      }
      { !todos ? (
        <p>Loading...</p>
      ) : (
        <TodoTable 
          todos={todos} 
          toggleStatus={toggleStatus} 
          sortTodos={sortTodos} 
          filterTodos={filterTodos} 
          displayDefault={displayDefault} 
        />
      )}
    </>
  )
}

export default App;
