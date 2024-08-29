import { SignUpForm, LoginForm } from "../types/types";

// const csrfToken = async () => await fetchCSRFToken();
export const fetchCSRFToken = async () => {
    console.log("Attempting fetching csrf token");
    try {
        const response = await fetch(`/api/csrf-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'  
            },
            credentials: 'include'
        });
        if(response.ok) {
            const jsonData = await response.json();
            console.log(jsonData, 'csrf token');
            return jsonData.csrf_token;
        }
    } catch(error) {
        throw new Error("Failed fetching csrf token");
    }
}

export const userSignUp = async (formData: SignUpForm) => {
    console.log("Attempting user sign up...");
    console.log(formData, 'formData');
    const csrfToken = await fetchCSRFToken();

    try {
        const response = await fetch(`api/user/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
                "X-CSRF-TOKEN": csrfToken
            },
            body: JSON.stringify(formData), 
            credentials: 'include'
        });
        if(response.ok) {
            const signedUpUserDetails = await response.json();
            console.log(signedUpUserDetails, 'signed up user details');
            return signedUpUserDetails;
        }
    } catch (error) {
        throw new Error("Failed user sign up");
    }
}

export const userLogin = async (formData: LoginForm) => {
    console.log("Attempting user login...");
    const csrfToken = await fetchCSRFToken();
    try {
        const response = await fetch(`api/user/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
                "X-CSRF-TOKEN": csrfToken
            },
            body: JSON.stringify(formData), 
            credentials: 'include'
        });
        if(response.ok) {
            const jsonData = await response.json();
            console.log(jsonData, 'logged in user details');
            const loggedInUserDetails: LoginForm = { ...jsonData, csrfToken };

            return loggedInUserDetails;
        }
    } catch (error) {
        throw new Error("Failed user sign up");
    }
}
