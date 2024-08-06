import { TodoInterface } from "../interfaces/interfaces";

const currentDate = new Date().toISOString().split('T')[0];

export const todos: TodoInterface[] = [
    { id: 1, body: "Buy groceries", status: false, date: currentDate },
    { id: 2, body: "Clean the house", status: false, date: currentDate },
    { id: 3, body: "Finish homework", status: false, date: currentDate },
    { id: 4, body: "Read a book", status: false, date: currentDate },
    { id: 5, body: "Pay bills", status: false, date: currentDate },
    { id: 6, body: "Prepare dinner", status: false, date: currentDate },
    { id: 7, body: "Exercise for 30 minutes", status: false, date: currentDate },
    { id: 8, body: "Call a friend", status: false, date: "1994-07-07" },
    { id: 9, body: "Write a blog post", status: false, date: "2014-04-04" },
    { id: 10, body: "Organize workspace", status: false, date: "2020-01-01" }
];