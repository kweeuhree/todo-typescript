import React, { useState } from 'react';

type FormData = {
    [key: string]: string ;
};

const useFormData = (initialState: FormData, callback: (formData: string) => void) => {
    
    const [formData, setFormData] = useState<FormData>(initialState);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev, 
            [target.name]: target.value
        }))
    }
    

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData, 'Form Data in useFormData hook');
        const callbackString: string = Object.values(formData)[0];
        callback(callbackString);
        setFormData(initialState);
    }

    return { formData, handleChange, handleSubmit };
}

export default useFormData;