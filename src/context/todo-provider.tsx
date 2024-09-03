import { useState, useCallback, useReducer } from 'react';
import { TodoContext } from './todo-context';
// import reducer function and initial state
import { reducer as todoReducer, initialState as todoInitialState} from '../reducer/todo_reducer'; 
import { reducer as userReducer, initialState as userInitialState} from '../reducer/user_reducer'; 
import { SortStateKey } from '../types/types'
// import fetching functions
import { get, create, deleteTodo, toggleTodoStatus } from '../utils/fetchTodos';
import { sort, filter, currentDate } from '../utils/helpers';
// import interfaces and types
import { CriterionInterface, TodoInterface } from '../interfaces/interfaces';
import { TodoContextType } from '../interfaces/interfaces';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [todoState, todoDispatch] = useReducer(todoReducer, todoInitialState);
    const [userState, userDispatch] = useReducer(userReducer, userInitialState);
    const [edit, setEdit] = useState<TodoInterface | null>(null);
    const [sortState, setSortState] = useState<Record<SortStateKey, boolean>>({
        title: false,
        date: false,
        check: false,
      });

    const userCsrfToken = userState.user.csrfToken as string;

    //fetch todos
  const getTodos = useCallback(async () => {
    try {
      const newTodos: TodoInterface[] = await get();
      todoDispatch({ type: 'INITIALIZE', payload: newTodos });
    } catch (error) {
      todoDispatch({ type: 'ERROR', payload: 'Failed to fetch data' });
    }
  }, [todoDispatch]);

    const toggleStatus = async (todoId: string) => {
        const toggled = await toggleTodoStatus(todoId, userCsrfToken);
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

  const addTodo = useCallback(async (newTodoString: string) => {
    const createdTodo = await create(newTodoString, userCsrfToken);
    const newTodo: TodoInterface = {
      ID: createdTodo.ID,
      Body: newTodoString,
      Status: false,
      Created: currentDate,
    }
    todoDispatch({ type: 'CREATE', payload: newTodo });
  }, [userCsrfToken]);

  const manipulateTodo = useCallback(async (action: string, todo: TodoInterface) => {
    switch(action) {
      case 'edit':
        setEdit(todo);
        break;
      case 'delete':
        await deleteTodo(todo.ID, userCsrfToken);
        todoDispatch({ type: 'DELETE', payload: todo });
    }
  }, [userCsrfToken]);

  const context: TodoContextType = {
    todoState, 
    todoDispatch, 
    getTodos, 
    userState, 
    userDispatch, 
    userCsrfToken,
    sortState, 
    setSortState, 
    sortTodos, 
    toggleStatus, 
    filterTodos,
    addTodo, 
    manipulateTodo,
    edit, 
    setEdit
};

    return ( 
        <TodoContext.Provider value={context}>
            {children}
        </TodoContext.Provider>
    );
}

export { Provider };