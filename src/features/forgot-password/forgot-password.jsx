import { useState } from 'react';
import Axios from 'axios';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import { ForgotPasswordCss } from 'stylesheets/forgot-password';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function PasswordForm({ email, setOpenModal }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await Axios.post('https://studyfil-api.onrender.com/user/resetpassword', { email, password }, { withCredentials: true });
        setPassword(false);
        setOpenModal(false);
        navigate('/signin');
    }

    return (
        <form className={ForgotPasswordCss.modalContent} onSubmit={handleSubmit}>
            <p>Enter new password</p>
            <TextField
                fullWidth
                margin="normal"
                size="small"
                id="password"
                label="New password"
                name="password"
                type="text"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2, margin: '0 auto', display: 'block' }}
                disabled={password ? false : true}
            >
                Change Password
            </Button>
        </form>
    )
}

function PinForm({ setIsPin }) {
    const [code, setCode] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await Axios.post('https://studyfil-api.onrender.com/user/verifyresetcode', { code }, { withCredentials: true });
        if (response.data.success) {
            setCode('');
            setIsPin(false);
        }
    }

    return (
        <form className={ForgotPasswordCss.modalContent} onSubmit={handleSubmit}>
            <p>We've sent you the verification code. Please check your inbox or spam.</p>
            <TextField
                fullWidth
                margin="normal"
                size="small"
                id="pin"
                label="Pin"
                name="pin"
                type="text"
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mb: 2, margin: '0 auto', display: 'block' }}
                disabled={code ? false : true}
            >
                Verify Code
            </Button>
        </form>
    )
}

function PinModal({ email, setOpenModal }) {
    const [isPin, setIsPin] = useState(true);

    return (
        <div className={ForgotPasswordCss.pinModalContainer}>
            {isPin ? <PinForm setIsPin={setIsPin} /> : <PasswordForm email={email} setOpenModal={setOpenModal} />}
        </div>
    )
}

export function ForgotPassword() {
    const [openModal, setOpenModal] = useState(false)
    const [emailError, setEmailError] = useState();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (emailError) setEmailError(false);
        setLoading(true);
        const response = await Axios.post('https://studyfil-api.onrender.com/user/resetcode', { email }, { withCredentials: true });
        setLoading(false);
        if (response.data.hasUser) {
            setOpenModal(true);
        } else {
            setEmailError(true);
        }
    }

    return (
        <div className={ForgotPasswordCss.forgotPassword}>
            <div className={ForgotPasswordCss.bgImage}></div>
            <form className={ForgotPasswordCss.form} onSubmit={handleSubmit}>
                <p>Please enter you email</p>
                <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                    error={emailError ? true : false}
                    helperText={emailError && 'User not found'}
                />
                {loading ?
                    <CircularProgress sx={{ display: 'block', margin: '10px auto' }}/>
                :
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 2, margin: '0 auto', display: 'block' }}
                        
                        disabled={email ? false : true}
                    >
                        Send Code
                    </Button>
                }
            </form>
            {openModal && <PinModal email={email} setOpenModal={setOpenModal} />}
        </div>
    )
}