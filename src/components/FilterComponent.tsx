import { useState } from 'react';
//import components
import FilterTodosForm from './FilterTodosForm';

const FilterComponent = () => {
    
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
                <FilterTodosForm filter={selectedFilter} />
            )
        }
    </div>
  )
}

export default FilterComponent;