// import useReducer
import { UserInterface } from '../interfaces/interfaces'

// create initialize state
export const initialState = {
    isAuthenticated: false,
    user: {} as UserInterface,
    authError: '',
}

// create reducer function