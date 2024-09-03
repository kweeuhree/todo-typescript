import { useState, useContext, useEffect } from 'react';
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
import { userLogout } from './utils/fetchUser';
//import todo context
import { TodoContext } from './context/todo-context';
// import { Provider } from './context/todo-provider';
import './App.css';



function App() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within a Provider');
  }

  const { 
    userState, userDispatch, userCsrfToken,
    todoState, todoDispatch, getTodos,
    toggleStatus, sortTodos, filterTodos,
    addTodo, manipulateTodo, edit, setEdit
  } = context;

  const [userForm, setUserForm] = useState('');
  const [message, updateMessage] = useMessage();

  useEffect(() => {
    getTodos();
  }, [getTodos])

  const displayDefault = () => {
    getTodos();
  };

  const showFormHandler = (formType: string) => {
    return setUserForm(formType);
  }

  const handleLogout = async () => {
    console.log('logging out with the following token:', userCsrfToken);
    const loggedOut = await userLogout(userCsrfToken);
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
          userToken={userCsrfToken} 
          />}
    </>
  )
}

export default App;
