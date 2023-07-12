import { useState, useContext, createContext } from 'react';
import { useParams } from 'react-router-dom';

const MessageContext = createContext();

export function useMessageContext() {
    return useContext(MessageContext);
}

export function MessageContextProvider({ children }) {
    const { groupId } = useParams();

    const [groups, setGroups] = useState(getGroups());

    return (
        <MessageContext.Provider value={{ groups, setGroups, groupId }}>
            { children }
        </MessageContext.Provider>
    )
}