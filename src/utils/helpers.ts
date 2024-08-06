//import todo interface
import { TodoInterface } from "../interfaces/interfaces";

export const filterStatus = (todos: TodoInterface[], todoId: number) => {
    const updatedTodos = todos.map((t) => {
        if(t.id === todoId) {
          return {
              ...t,
            status: !t.status
          };
        }
        return t;
      })

      return updatedTodos;
}

export const sort = async (todos: TodoInterface[], action: string) => {
  let sortedTodos;
  switch(action) {
    case 'title true':
      sortedTodos = [...todos].sort((a, b)=> a.body.localeCompare(b.body));
      break;
    case 'title false':
      sortedTodos = [...todos].sort((a, b)=> b.body.localeCompare(a.body));
      break;
    case 'date true':
      sortedTodos = [...todos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case 'date false':
      sortedTodos = [...todos].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case 'check true':
      sortedTodos = [...todos].sort((a, b) => Number(a.status) - Number(b.status));
      break;
    case 'check false':
      sortedTodos = [...todos].sort((a, b) => Number(b.status) - Number(a.status));
      break;
    default:
      sortedTodos = [...todos].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  console.log(sortedTodos, 'sorted todos')
  return sortedTodos;
}