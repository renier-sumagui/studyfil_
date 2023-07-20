import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import { SignInForm } from './sign-in-form';
import { SignUpLinks } from './sign-up-links';
import { AboutUsLink } from 'features/about-us';
import { PaperWrapper } from '../paper-wrapper.jsx';

export function SignIn() {
    return (
        <PaperWrapper>
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
        </PaperWrapper>
    )
}