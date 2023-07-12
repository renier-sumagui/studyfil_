import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import submitSignInForm from './submit-signin-form.js';
import CircularProgress from '@mui/material/CircularProgress';

export function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const helpers = {
        emailError: (helperText) => setEmailError(helperText),
        passwordError: (helperText) => setPasswordError(helperText)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setEmailError(false);
        setPasswordError(false);
        setLoading(true);
        const result = await submitSignInForm(email, password);
        setLoading(false);
        if (!result.data.success) {     /* If email and password is not valid or incorrect */
            result.data.errors.map((row) => {
                helpers[`${row.error}`](row.helperText);
            })
        } else {
            navigate('/')
        }
    }

    return (
        <Box component="form" validate="true" sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                fullWidth
                size="small"
                id="email"
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError && true}
                helperText={emailError}
                autoFocus
            />
            <TextField
                margin="normal"
                fullWidth
                size="small"
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError && true}
                helperText={passwordError}
            />
            {loading ? 
                <CircularProgress sx={{ display: 'block', margin: '10px auto' }}/>
            :
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                >
                    Sign In
                </Button>
            }
        </Box>
    )
}