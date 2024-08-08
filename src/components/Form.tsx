import React, { useState } from 'react';
// import interfaces
import { CriterionInterface } from '../interfaces/interfaces';

type Props = {
    filter: string,
    filterTodos: (criterion: CriterionInterface) => void,
}

const Form = ({ filter, filterTodos }: Props) => {

    const [formData, setFormData] = useState({});

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev, 
            [target.name]: target.value
        }))
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData, 'target value in form');
        filterTodos(formData);
        setFormData({});
    }

    const filterByDate = () => {
        return (
          <>
            <input type="date" name="date" value={formData.date} onChange={handleChange}/>
          </>
        )
    }

    const filterByStatus = () => {
        return (
          <>
        <div>
          <input type="radio" id="checked" name="status" value="Checked" onChange={handleChange} />
          <label htmlFor="checked">Checked</label>
        </div>
        <div>
          <input type="radio" id="unchecked" name="status" value="Unchecked" onChange={handleChange} />
          <label htmlFor="unchecked">Unchecked</label>
        </div>
          </>
        )
    }

  return (
    <form onSubmit={handleSubmit}>
        { filter === 'date' ? filterByDate() : filterByStatus() }
        <input type="submit" value="Apply"/>
    </form>
  )
}

export default Form;