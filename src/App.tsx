import { useState, useReducer, useEffect, useCallback } from 'react';
// import reducer function and initial state
import { reducer as todoReducer, initialState as todoInitialState} from './reducer/todo_reducer'; 
import { reducer as userReducer, initialState as userInitialState} from './reducer/user_reducer'; 
// import custom hook that sets status messages
import useMessage from './utils/useMessage';
// import components
import TodoTable from './components/TodoTable'
import AddNew from './components/AddNew';
import UpdateTodo from './components/UpdateTodo';
import UserSignUpLoginForm from './components/UserSignUpLoginForm';
// import material ui
import Button from '@mui/material/Button';
// import fetching and helper logic
import { get, create, deleteTodo, toggleTodoStatus } from './utils/fetchTodos';
import { userLogout } from './utils/fetchUser';
import { sort, filter, currentDate } from './utils/helpers';
// import interfaces and types
import { TodoInterface, CriterionInterface } from './interfaces/interfaces';
import { SortStateKey } from './types/types'
import './App.css';


function App() {
  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [userForm, setUserForm] = useState('');
  const [message, updateMessage] = useMessage();
  const [sortState, setSortState] = useState<Record<SortStateKey, boolean>>({
    title: false,
    date: false,
    check: false,
  });

  const [edit, setEdit] = useState<TodoInterface | null>(null);
  
  //fetch todos
  const getTodos = useCallback(async () => {
    try {
      const newTodos: TodoInterface[] = await get();
      todoDispatch({ type: 'INITIALIZE', payload: newTodos });
    } catch (error) {
      todoDispatch({ type: 'ERROR', payload: 'Failed to fetch data' });
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos])

  const toggleStatus = async (todoId: string) => {
    const toggled = await toggleTodoStatus(todoId);
    if(toggled) {
      todoDispatch({ type: 'TOGGLE_STATUS', payload: todoId });
    }
  }

  const sortTodos = useCallback(async (action: SortStateKey) => {
    const verifyAction = (action: SortStateKey) => {
      setSortState((prev) => ({
        ...prev,          
        [action]: !prev[action] 
      }));
  
      return `${action} ${sortState[action]}`;
    }

    const verifiedAction = verifyAction(action);
    const sortedTodos = await sort(todoState.todos, verifiedAction);
    todoDispatch({ type: 'SORT', payload: sortedTodos });
  }, [sortState, todoState.todos]);

  const filterTodos = useCallback(async (criterion: CriterionInterface) => {
    const filteredTodos: TodoInterface[]  = await filter(todoState.todos, criterion);
    todoDispatch({ type: 'FILTER', payload: filteredTodos });
  }, [todoState.todos]);

  const displayDefault = () => {
    getTodos();
  };

  const addTodo = useCallback(async (newTodoString: string) => {
    const createdTodo = await create(newTodoString);
    const newTodo: TodoInterface = {
      ID: createdTodo.ID,
      Body: newTodoString,
      Status: false,
      Created: currentDate,
    }
    todoDispatch({ type: 'CREATE', payload: newTodo });
  }, []);

  const manipulateTodo = useCallback(async (action: string, todo: TodoInterface) => {
    switch(action) {
      case 'edit':
        setEdit(todo);
        break;
      case 'delete':
        await deleteTodo(todo.ID);
        todoDispatch({ type: 'DELETE', payload: todo });
    }
  }, []);

  const showFormHandler = (formType: string) => {
    return setUserForm(formType);
  }

  const handleLogout = async () => {
    console.log('logging out with the following token:', userState.user.csrfToken);
    const loggedOut = await userLogout(userState.user.csrfToken);
    if(loggedOut) {
      userDispatch({ type: 'LOGOUT' });
      updateMessage(loggedOut.Flash);
    } else {
      updateMessage('Failed to log out');
    }
  }

  const { todos, error } = todoState;


  return (
    <>
    <p>{message}</p>
    
    {/* sign up and login buttons */}
   { userState.isAuthenticated ?
      ( <Button onClick={handleLogout}>Log out</Button>
    ) : (
      <>
        <Button onClick={() => showFormHandler('signup')}>Sign Up</Button>
        <Button onClick={() => showFormHandler('login')}>Login</Button>
      </>)
    }
    { userForm && 
        <UserSignUpLoginForm 
          formType={userForm} 
          dispatch={userDispatch} 
          updateMessage={updateMessage} 
          setUserForm={setUserForm}
          /> }
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
          userState={userState}
        />
      )}

      {/* add new todo */}
     {userState.isAuthenticated &&  <AddNew addTodo={addTodo}/>}

      {/* update an existing todo */}
      { edit &&  
        <UpdateTodo 
          todo={edit} 
          setEdit={setEdit} 
          dispatch={todoDispatch} 
          />}
    </>
  )
}

export default App;
