//import todo interface
import { TodoInterface, CriterionInterface } from "../interfaces/interfaces";
import { todos } from '../data/sampleData'

export const currentDate = new Date().toISOString().split('T')[0];

export const filterStatus = (todos: TodoInterface[], todoId: string) => {
    const updatedTodos = todos.map((t) => {
        if(t.ID === todoId) {
          return {
              ...t,
            Status: !t.Status
          };
        }
        return t;
      })

      return updatedTodos;
}

const sortingFunctions: {
  [key: string]: (a: TodoInterface, b: TodoInterface) => number;
} = {
  'title true': (a, b) => a.Body.localeCompare(b.Body), // sort alphabetically in ascending order
  'title false': (a, b) => b.Body.localeCompare(a.Body), // sort alphabetically in descending order
  'date true': (a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime(), // sort by date, old first
  'date false': (a, b) => new Date(a.Created).getTime() - new Date(b.Created).getTime(), // sort by date, new first
  'check true': (a, b) => Number(a.Status) - Number(b.Status), // group all checked on top
  'check false': (a, b) => Number(b.Status) - Number(a.Status), // group all checked on bottom
}

export const sort: (todos: TodoInterface[], action: string) => Promise<TodoInterface[]> = async (todos, action) => {
  const sortingFunc = sortingFunctions[action] || sortingFunctions['date false']; // by default sort by date, new first 
  const sortedTodos = [...todos].sort(sortingFunc);
  return sortedTodos;
}

export const filter = async (criterion: CriterionInterface) => {
  // desctructure criterion object
  const { status, date } = criterion;

  // filter todos
  const filteredTodos = todos.filter((t) => 
    // if Status is checked, return todos with Status true
    (status === 'Checked' && t.Status) || 
    // if Status is unchecked, return todos with Status false
    (status === 'Unchecked' && !t.Status) ||
    // return todos with the date that equals the input 
    (date && t.Created === date)
  )

  return filteredTodos || [];
}
