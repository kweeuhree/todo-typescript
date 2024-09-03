import { useContext } from 'react';
//import react icons
import { FaSort } from "react-icons/fa";
// import types 
import { SortStateKey } from "../types/types";
// import context
import { TodoContext } from '../context/todo-context';


const heads: SortStateKey[] = ['title', 'date', 'check'];
const noHeads: string[] = ['', ''];


const TableHeads = () => {

    const { userState, sortTodos } = useContext(TodoContext);

    const headColumns = heads.map((head, index) => (
        <tr key={head+index}>
            <td className='table-head'>
                <span>{head.toUpperCase()}</span>
                <span onClick={()=> sortTodos(head)}><FaSort /></span> 
            </td>
        </tr>
    ))

    const noHeadColumns = noHeads.map((head, index) => (
        <tr key={head+index}>
            <td className='table-head'></td>
        </tr>
    ))

  return (
        <>
            { headColumns}
            { userState.isAuthenticated && noHeadColumns }
        </>
);


}

export default TableHeads;