import { useState } from 'react';

//import components
import Form from './Form';

type Props = {
    filterTodos: (criterion: string) => void,
}

const FilterComponent = ({ filterTodos } : Props) => {
    
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleSelectedFilter = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter: string = target.value;
        console.log('Setting todo filter to: ', selectedFilter);
        setSelectedFilter(selectedFilter);
    }

  return (
    <div>
        <label htmlFor='select-filter'>Filter by:</label>
        <select id='select-filter' onChange={handleSelectedFilter}>
            <option value=''>Select filter</option>
            <option value='date'>Date</option>
            <option value='check-status'>Check status</option>
        </select>
        {
            selectedFilter && (
                <Form filter={selectedFilter} filterTodos={filterTodos} />
            )
        }
    </div>
  )
}

export default FilterComponent;