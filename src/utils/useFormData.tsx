import React, { useState } from 'react';

const useFormData = <T,>(initialState: T, callback: (data: T) => void) => {
    const [formData, setFormData] = useState<T>(initialState);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev, 
            [target.name]: target.value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData, 'Form Data in useFormData hook');
        callback(formData);
        setFormData(initialState);
    };

    return { formData, handleChange, handleSubmit };
};

export default useFormData;
