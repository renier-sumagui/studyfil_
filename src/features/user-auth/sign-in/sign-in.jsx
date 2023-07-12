import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import { SignInForm } from './sign-in-form';
import { SignUpLinks } from './sign-up-links';
import { AboutUsLink } from 'features/about-us';

export function SignIn() {
    return (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ position: 'relative' }}>
            <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar src="img/logo1.png" sx={{ width: 150, height: 150, m: 1 }} />
                <SignInForm />
                <SignUpLinks />
            </Box>
            <AboutUsLink />
        </Grid>
    )
}