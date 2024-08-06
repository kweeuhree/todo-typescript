type Props = {
    filterTodos: (criterion: string) => void,
}

const FilterComponent = ({ filterTodos } : Props) => {

    const handleSelectedFilter = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('Setting todo filter to: ', target.value);
        filterTodos(target.value);
    }

  return (
    <div>
        <label htmlFor='select-filter'>Filter by:</label>
        <select id='select-filter' onChange={handleSelectedFilter}>
            <option value=''>Select filter</option>
            <option value='date'>Date</option>
            <option value='check-status'>Check status</option>
        </select>
    </div>
  )
}

export default FilterComponent;