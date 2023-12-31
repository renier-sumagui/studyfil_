import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';

import { SignUpForm } from './sign-up-form';
import { SignUpContextProvider } from './sign-up-context';
import { useLinkHandler } from 'hooks/';
import { AboutUsLink } from 'features/about-us';
import { PaperWrapper } from '../paper-wrapper';

export function SignUp() {
    const linkHandler = useLinkHandler();

    return (
        <SignUpContextProvider>
            <PaperWrapper>
                <Box
                    sx={{
                        mt: 4,
                        mb: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ width: 100, height: 100, m: 1 }}>
                        <AccountCircleIcon sx={{ height: '110%', width:'110%'}} />
                    </Avatar>
                    <SignUpForm />
                    <Link href="/signin" variant="body2" onClick={(e) => linkHandler(e)}>Already have an account? Sign In</Link>
                    <AboutUsLink />
                </Box>
            </PaperWrapper>
        </SignUpContextProvider>
    )
}