import { Dispatch, SetStateAction } from 'react'; 
// import useFormData hook
import useFormData from '../utils/useFormData';
// import user reducer actions
import { LoginForm, SignUpForm, UserAction } from '../types/types';
// import material ui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userSignUp, userLogin } from '../utils/fetchUser';

type Props = {
    formType: string,
    dispatch: Dispatch<UserAction>,
    updateMessage: (newMessage: string) => void,
    setUserForm: Dispatch<SetStateAction<string>>,
}

const UserSignUpLoginForm = ({ formType, dispatch, updateMessage, setUserForm }: Props) => {
    const initialState = formType === 'signup' ? 
        {name: '', email: '', password: ''} : 
        {email: '', password: ''};   

    const { formData, handleChange, handleSubmit } = useFormData(
            initialState,
            (data) => handleFormSubmit(data)
        );
    
        const handleFormSubmit = async (data: SignUpForm | LoginForm) => {
            console.log(data, 'data in handleFormSubmit');
            if (formType === 'signup') {
                const userIsSignedUp: SignUpForm = await userSignUp(data);
                if(userIsSignedUp) {
                    handleSuccessfulSubmission('SIGNUP', data, 'login', userIsSignedUp.Flash);
                }
            } else {
                const userIsLoggedIn: LoginForm | undefined = await userLogin(data);
                if(userIsLoggedIn) {
                    handleSuccessfulSubmission('LOGIN', data, '', userIsLoggedIn.Flash);
                }
            }
        }

        const handleSuccessfulSubmission = (
            dispatchType: 'SIGNUP' | 'LOGIN', 
            payloadData: SignUpForm | LoginForm, 
            formType: string, 
            flashMessage: string | undefined
        ) => {
            dispatch({ type: dispatchType, payload: payloadData });
            setUserForm(formType);
            flashMessage && updateMessage(flashMessage);
        }

        
  return (
    <form onSubmit={handleSubmit}>
        { formType === 'signup' && 
            <TextField 
                className="whiteTextField"
                label="User name" 
                color="success" 
                variant="filled" 
                type='text' 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
            />  }
        <TextField 
                className="whiteTextField"
                label="Email" 
                color="success" 
                variant="filled" 
                type='email' 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
        <TextField 
                className="whiteTextField"
                label="Password" 
                color="success" 
                variant="filled" 
                type='password' 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
            />    
            <Button type='submit' variant="contained" color="success">
                { formType === 'signup' ? 'Sign Up' : 'Login' }
            </Button>
    </form>
  )
}
export default UserSignUpLoginForm;