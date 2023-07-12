import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthHero } from 'features/user-auth';
import { SignIn } from 'features/user-auth/';

const theme = createTheme();

export function SignInPage() {
    const navigate = useNavigate();

    useState(() => {
        (async function() {
            const response = await Axios.get('http://localhost:8000/user/check', { withCridentials: true });
            if (response.data.isLoggedIn) {
                navigate('/groups/explore');
            }
        })();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <AuthHero />
                <SignIn />
            </Grid>
        </ThemeProvider>
    )
}