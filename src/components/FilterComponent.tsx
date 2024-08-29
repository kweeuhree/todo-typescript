import { useState } from 'react';
import { CriterionInterface } from '../interfaces/interfaces';
//import components
import FilterTodosForm from './FilterTodosForm';

type Props = {
    filterTodos: (criterion: CriterionInterface) => void,
}

const FilterComponent = ({ filterTodos } : Props) => {
    
    const [selectedFilter, setSelectedFilter] = useState('');

    const handleSelectedFilter = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilter: string = target.value;
        console.log('Setting todo filter to: ', selectedFilter);
        setSelectedFilter(selectedFilter);
    }

  return (
    <div className='flex-container space-between'>
        <label htmlFor='select-filter'>Filter by:</label>
        <select id='select-filter' onChange={handleSelectedFilter}>
            <option value=''>Select filter</option>
            <option value='date'>Date</option>
            <option value='check-status'>Check status</option>
        </select>
        {
            selectedFilter && (
                <FilterTodosForm filter={selectedFilter} filterTodos={filterTodos} />
            )
        }
    </div>
  )
}

export default FilterComponent;