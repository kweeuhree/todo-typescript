//import todo interface
import { TodoInterface, CriterionInterface } from "../interfaces/interfaces";
import { todos } from '../data/sampleData'

export const currentDate = new Date().toISOString().split('T')[0];

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

const sortingFunctions: {
  [key: string]: (a: TodoInterface, b: TodoInterface) => number;
} = {
  'title true': (a, b) => a.body.localeCompare(b.body), // sort alphabetically in ascending order
  'title false': (a, b) => b.body.localeCompare(a.body), // sort alphabetically in descending order
  'date true': (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(), // sort by date, old first
  'date false': (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(), // sort by date, new first
  'check true': (a, b) => Number(a.status) - Number(b.status), // group all checked on top
  'check false': (a, b) => Number(b.status) - Number(a.status), // group all checked on bottom
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
    // if status is checked, return todos with status true
    (status === 'Checked' && t.status) || 
    // if status is unchecked, return todos with status false
    (status === 'Unchecked' && !t.status) ||
    // return todos with the date that equals the input 
    (date && t.date === date)
  )

  return filteredTodos || [];
}
