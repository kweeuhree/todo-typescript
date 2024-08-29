import { expect, describe, it } from 'vitest'
import { sort, filter } from '../src/utils/helpers';
import { TodoInterface } from '../src/interfaces/interfaces';

// test('addTodo returns a todo object', () => {
//   expect(sum(1, 2)).toBe(3)
// })


// Sample todos for testing
const todos: TodoInterface[] = [
    {ID: '1', Body: 'Do the dishes', Status: false, Created: '2023-08-10' },
    {ID: '2', Body: 'Buy groceries', Status: true, Created: '2023-08-11' },
    {ID: '3', Body: 'Pay bills', Status: false, Created: '2023-08-09' },
  ];
  
  describe('sort function', () => {
    it('sorts todos by title in ascending order', async () => {
      const sortedTodos = await sort(todos, 'title true');
      expect(sortedTodos[0].Body).toBe('Buy groceries');
      expect(sortedTodos[1].Body).toBe('Do the dishes');
      expect(sortedTodos[2].Body).toBe('Pay bills');
    });
  
    it('sorts todos by title in descending order', async () => {
      const sortedTodos = await sort(todos, 'title false');
      expect(sortedTodos[0].Body).toBe('Pay bills');
      expect(sortedTodos[1].Body).toBe('Do the dishes');
      expect(sortedTodos[2].Body).toBe('Buy groceries');
    });
  
    it('sorts todos by Created in descending order', async () => {
      const sortedTodos = await sort(todos, 'Created true');
      expect(sortedTodos[0].Created).toBe('2023-08-11');
      expect(sortedTodos[1].Created).toBe('2023-08-10');
      expect(sortedTodos[2].Created).toBe('2023-08-09');
    });
  
    it('sorts todos by Created in ascending order', async () => {
      const sortedTodos = await sort(todos, 'Created false');
      expect(sortedTodos[0].Created).toBe('2023-08-09');
      expect(sortedTodos[1].Created).toBe('2023-08-10');
      expect(sortedTodos[2].Created).toBe('2023-08-11');
    });
  
    it('sorts todos by Status in ascending order (false to true)', async () => {
      const sortedTodos = await sort(todos, 'check true');
      expect(sortedTodos[0].Status).toBe(false);
      expect(sortedTodos[1].Status).toBe(false);
      expect(sortedTodos[2].Status).toBe(true);
    });
  
    it('sorts todos by Status in descending order (true to false)', async () => {
      const sortedTodos = await sort(todos, 'check false');
      expect(sortedTodos[0].Status).toBe(true);
      expect(sortedTodos[1].Status).toBe(false);
      expect(sortedTodos[2].Status).toBe(false);
    });
  
    it('returns todos sorted by Created in ascending order when action is default', async () => {
      const sortedTodos = await sort(todos, 'invaID_action');
      expect(sortedTodos[0].Created).toBe('2023-08-09');
      expect(sortedTodos[1].Created).toBe('2023-08-10');
      expect(sortedTodos[2].Created).toBe('2023-08-11');
    });
  });

  describe('filter function', () => {
    it('filters todos by checked Status', async () => {
      const filteredTodos = await filter(todos, {status: 'Checked'});
      const expectedOutput = [];
      expect(filteredTodos).toEqual(expectedOutput);
    })
  })

  describe('filter function', () => {
    it('filters todos by unchecked Status', async () => {
      const filteredTodos = await filter(todos, {status: 'Unchecked'});
      expect(filteredTodos[0]).toEqual( {ID: 1, Body: "Buy groceries", Status: false, Created: "2023-12-01" },);
      expect(filteredTodos[9]).toEqual( {ID: 10, Body: "Organize workspace", Status: false, Created: "1994-07-07" },);
    })
  })