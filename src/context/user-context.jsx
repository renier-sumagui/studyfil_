import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({ userDetails, children }) {
    const [user, setUser] = useState(userDetails);

    return (
        <UserContext.Provider value={{ user }}>
            { children }
        </UserContext.Provider>
    )
}