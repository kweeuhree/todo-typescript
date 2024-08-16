import { expect, describe, it } from 'vitest'
import { sort } from '../src/utils/helpers';
import { TodoInterface } from '../src/interfaces/interfaces';

// test('addTodo returns a todo object', () => {
//   expect(sum(1, 2)).toBe(3)
// })


// Sample todos for testing
const todos: TodoInterface[] = [
    { id: 1, body: 'Do the dishes', status: false, date: '2023-08-10' },
    { id: 2, body: 'Buy groceries', status: true, date: '2023-08-11' },
    { id: 3, body: 'Pay bills', status: false, date: '2023-08-09' },
  ];
  
  describe('sort function', () => {
    it('sorts todos by title in ascending order', async () => {
      const sortedTodos = await sort(todos, 'title true');
      expect(sortedTodos[0].body).toBe('Buy groceries');
      expect(sortedTodos[1].body).toBe('Do the dishes');
      expect(sortedTodos[2].body).toBe('Pay bills');
    });
  
    it('sorts todos by title in descending order', async () => {
      const sortedTodos = await sort(todos, 'title false');
      expect(sortedTodos[0].body).toBe('Pay bills');
      expect(sortedTodos[1].body).toBe('Do the dishes');
      expect(sortedTodos[2].body).toBe('Buy groceries');
    });
  
    it('sorts todos by date in descending order', async () => {
      const sortedTodos = await sort(todos, 'date true');
      expect(sortedTodos[0].date).toBe('2023-08-11');
      expect(sortedTodos[1].date).toBe('2023-08-10');
      expect(sortedTodos[2].date).toBe('2023-08-09');
    });
  
    it('sorts todos by date in ascending order', async () => {
      const sortedTodos = await sort(todos, 'date false');
      expect(sortedTodos[0].date).toBe('2023-08-09');
      expect(sortedTodos[1].date).toBe('2023-08-10');
      expect(sortedTodos[2].date).toBe('2023-08-11');
    });
  
    it('sorts todos by status in ascending order (false to true)', async () => {
      const sortedTodos = await sort(todos, 'check true');
      expect(sortedTodos[0].status).toBe(false);
      expect(sortedTodos[1].status).toBe(false);
      expect(sortedTodos[2].status).toBe(true);
    });
  
    it('sorts todos by status in descending order (true to false)', async () => {
      const sortedTodos = await sort(todos, 'check false');
      expect(sortedTodos[0].status).toBe(true);
      expect(sortedTodos[1].status).toBe(false);
      expect(sortedTodos[2].status).toBe(false);
    });
  
    it('returns todos sorted by date in ascending order when action is default', async () => {
      const sortedTodos = await sort(todos, 'invalid_action');
      expect(sortedTodos[0].date).toBe('2023-08-09');
      expect(sortedTodos[1].date).toBe('2023-08-10');
      expect(sortedTodos[2].date).toBe('2023-08-11');
    });
  });