import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';

import { AuthHero } from 'features/user-auth';
import { SignUp } from 'features/user-auth';
import { AboutUsLink } from 'features/about-us';

const theme = createTheme();

export function SignUpPage() {
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', overflow: 'auto' }}>
                <CssBaseline />
                <AuthHero />
                <SignUp />
            </Grid>
        </ThemeProvider>
    )
}