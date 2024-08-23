import { useState, useReducer, useEffect } from 'react';
// import reducer function and initial state
import { reducer, initialState } from './utils/reducer'; 
// import components
import TodoTable from './components/TodoTable'
import AddNew from './components/AddNew';
import UpdateTodo from './components/UpdateTodo';
// import fetching and helper logic
import { get, create, deleteTodo, toggleTodoStatus } from './utils/fetchTodos';
import { sort, filter, currentDate } from './utils/helpers';
// import interfaces and types
import { TodoInterface, CriterionInterface } from './interfaces/interfaces';
import { SortStateKey } from './types/types'
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sortState, setSortState] = useState<Record<SortStateKey, boolean>>({
    title: false,
    date: false,
    check: false,
  });

  const [edit, setEdit] = useState<TodoInterface | null>(null);
  
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

  const toggleStatus = async (todoId: string) => {
    const toggled = await toggleTodoStatus(todoId);
    if(toggled) {
      dispatch({ type: 'TOGGLE_STATUS', payload: todoId });
    }
  }

  const verifyAction = (action: SortStateKey) => {
    setSortState((prev) => ({
      ...prev,          
      [action]: !prev[action] 
    }));

    return `${action} ${sortState[action]}`;
  }

  const sortTodos = async (action: SortStateKey) => {
    console.log(action, 'action in sortTodos');
    const verifiedAction = verifyAction(action);
    const sortedTodos = await sort(state.todos, verifiedAction);
    // setTodos(sortedTodos);
    dispatch({ type: 'SORT', payload: sortedTodos });
  }

  const filterTodos: (criterion: CriterionInterface) => void = async (criterion) => {
    const filteredTodos: TodoInterface[]  = await filter(state.todos, criterion);
    dispatch({ type: 'FILTER', payload: filteredTodos });
  }

  const displayDefault = () => {
    getTodos();
  };

  const addTodo = async (newTodoString: string) => {
    const createdTodo = await create(newTodoString);
    const newTodo: TodoInterface = {
      ID: createdTodo.ID,
      Body: newTodoString,
      Status: false,
      Created: currentDate,
    }
    dispatch({ type: 'CREATE', payload: newTodo});
  }

  const manipulateTodo = async (action: string, todo: TodoInterface) => {
    switch(action) {
      case 'edit':
        setEdit(todo);
        break;
      case 'delete':
        await deleteTodo(todo.ID);
        dispatch({ type: 'DELETE', payload: todo });
    }
  }

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
          manipulateTodo={manipulateTodo}
          displayDefault={displayDefault} 
        />
      )}

      {/* add new todo */}
      <AddNew addTodo={addTodo}/>

      {/* update an existing todo */}
      { edit &&  
        <UpdateTodo 
          todo={edit} 
          setEdit={setEdit} 
          dispatch={dispatch} 
          />}
    </>
  )
}

export default App;
