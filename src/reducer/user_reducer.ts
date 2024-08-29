// import userInterface and userAction
import { UserInterface } from '../interfaces/interfaces';
import { UserAction } from '../types/types';

// create initialize state
export const initialState = {
    isAuthenticated: false,
    user: {} as UserInterface,
    authError: '',
}

type State = typeof initialState;

// create reducer function
export const reducer = (state: State, action: UserAction) => {
    switch(action.type) {
        case 'SIGNUP':
            return {
                ...state,
                user: {
                    ...state.user,
                    Name: action.payload.name,
                    Email: action.payload.email
                }                    
            };
        case 'LOGIN': 
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...state.user,
                    Uuid: action.payload.uuid,
                    Email: action.payload.email,
                    csrfToken: action.payload.csrfToken,
                }
        };
        case 'LOGOUT':
            return console.log('attempting log out');
        case 'CSRF_TOKEN':
            return console.log('attempting csrf token');
        case 'ERROR':
            return console.log('error');
    }
};