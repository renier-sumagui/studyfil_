import { useContext, createContext, useState, useEffect } from 'react';
import Axios from 'axios';

const GroupContext = createContext();

export function useGroupContext() {
    return useContext(GroupContext);
}

export function GroupContextProvider({ groupId, children }) {
    const [group, setGroup] = useState();

    useEffect(() => {
        (async function() {
            const response = await Axios.get(`https://studyfil-api.onrender.com/groups/get/${groupId}`);
            setGroup(response.data.group);
        })();
    }, []);

    return (
        <GroupContext.Provider value={{ group }}>
            { children }
        </GroupContext.Provider>        
    )
}