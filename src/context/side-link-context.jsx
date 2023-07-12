import { createContext, useContext, useState } from 'react';

const SideLinkContext = createContext();

export function useSideLinkContext() {
    return useContext(SideLinkContext);
}

export function SideLinkContextProvider({ children }) {
    const [currentLink, setCurrentLink] = useState('Home');

    return (
        <SideLinkContext.Provider value={{ currentLink, setCurrentLink }}>
            { children }
        </SideLinkContext.Provider>
    )
}