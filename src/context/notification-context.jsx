import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { useUserContext } from 'context/';

const NotificationContext = createContext();

export function useNotificationContext() {
    return useContext(NotificationContext);
}

export function NotificationContextProvider({ children }) {
    let location = useLocation();
    const { user } = useUserContext();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        (async function() {
            let response = await Axios.get(`https://studyfil-api.onrender.com/user/notifications/${user.id}`);
            setNotifications(response.data);
        })();
    }, [location])

    return (
        <NotificationContext.Provider value={{ notifications: notifications }}>
            { children }
        </NotificationContext.Provider>
    )
}