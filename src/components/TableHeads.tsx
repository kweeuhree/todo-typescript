//import react icons
import { FaSort } from "react-icons/fa";

type Props = {
    sortTodos: (head: string) => void;
}

const TableHeads = ( { sortTodos }: Props ) => {

    const heads: string[] = ['title', 'date', 'check', '', ''];

    const toDisplay = heads.map((head, index) => (
        <tr key={head+index}>
            <td className='table-head'>
                <span>{head.toUpperCase()}</span>
                {/* conditinally display the sorting function */}
                { head &&
                     <span onClick={()=> sortTodos(head)}><FaSort /></span> 
                 }
            </td>
        </tr>
    ))

  return toDisplay;


}

export default TableHeads;