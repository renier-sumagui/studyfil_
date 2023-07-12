import { createContext, useState, useReducer, useContext } from 'react';

const SignUpContext = createContext();

export function useSignUpContext() {
    return useContext(SignUpContext);
}


const ACTIONS = {
    UPDATE_USERNAME: 'updateUsername',
    UPDATE_FIRSTNAME: 'updateFirstName',
    UPDATE_LASTNAME: 'updateLastName'
}

function formDataReducer(formData, action) {
    const callbacks = {
        updateUsername: (value) => {
            return {...formData, userName: value}
        },
        updateFirstName: (value) => {
            return {...formData, firstName: value}
        }
    }
    
    const callFunction = callbacks[action.type](action.payload.value);
    

    return callFunction;
}

export function SignUpContextProvider({ children }) {
    const [formData, formDataDispatch] = useReducer(formDataReducer, {
        userName: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        sex: '',
        email: '',
        password: ''
    })

    return (
        <SignUpContext.Provider value={{ formData, formDataDispatch, ACTIONS }}>
            { children }
        </SignUpContext.Provider>
    )
}