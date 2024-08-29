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
export const reducer = (state: State, action: UserAction): State => {
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
            return {
                ...state,
                isAuthenticated: false,
                user: {
                    ...state.user,
                    Uuid: '',
                    Email: '',
                    csrfToken: '',
                }
            };
        case 'ERROR':
            return {
                ...state,
                authError: action.payload
            };
        default:
                throw new Error('Unknown action type');
    }
};