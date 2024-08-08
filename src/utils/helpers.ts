//import todo interface
import { TodoInterface, CriterionInterface } from "../interfaces/interfaces";
import { todos } from '../data/sampleData'

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

export const sort:(todos: TodoInterface[], action: string) => Promise<TodoInterface[]> = async (todos, action) => {
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
  console.log('are sorted todos an array? ', Array.isArray(sortedTodos));
  return sortedTodos;
}

export const filter = async (criterion: CriterionInterface) => {
  let filteredTodos;
  console.log(criterion, 'criterion inside filter function');
  if (criterion.status === 'Checked') {
    filteredTodos = todos.filter((t) => t.status === true);
  } else if (criterion.status === 'Unchecked') {
    filteredTodos = todos.filter((t) => t.status === false);
  } else if (criterion.date) {
    filteredTodos = todos.filter((t) => t.date === criterion.date);
  } 

  return filteredTodos || [];
}