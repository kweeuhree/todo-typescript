//import react icons
import { FaSort } from "react-icons/fa";
// import types 
import { SortStateKey } from "../types/types";

type Props = {
    sortTodos: (head: SortStateKey) => void;
}

const TableHeads = ( { sortTodos }: Props ) => {

    const heads: SortStateKey[] = ['title', 'date', 'check'];

    const toDisplay = heads.map((head, index) => (
        <tr key={head+index}>
            <td className='table-head'>
                <span>{head.toUpperCase()}</span>
                <span onClick={()=> sortTodos(head)}><FaSort /></span>
            </td>
        </tr>
    ))

  return toDisplay;


}

export default TableHeads;