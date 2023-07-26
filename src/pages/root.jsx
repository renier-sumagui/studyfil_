import { useEffect, useState } from 'react';
import Axios from 'axios';
import { HomeHeader } from 'features/home';
import { SideBar, Body, MainSection } from 'layouts/';
import { Messages } from 'features/messages';
import { UserContextProvider } from 'context/';
import { WordsContextProvider } from 'context/';

import { useNavigate, Outlet } from 'react-router-dom';

export function Root() {
    const navigate = useNavigate();   
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        console.log('user asdasda');
        (async function() {
            const response = await Axios.get('https://studyfil-api.onrender.com/user/check', { withCredentials: true });
            if (response.data.isLoggedIn) {
                setIsLoggedIn(true);
                setUser(response.data.user);
            } else {
                navigate('/signin');
            }
        })();
    }, [])

    if (!isLoggedIn) {
        return null;
    } else {
        return (
            <>
                <UserContextProvider userDetails={user}>
                    <WordsContextProvider>
                        <HomeHeader />
                        <Body>
                            <SideBar />
                            <MainSection>
                                <Outlet />
                            </MainSection>
                        </Body>
                    </WordsContextProvider>
                </UserContextProvider>
            </>
        )
    }
}