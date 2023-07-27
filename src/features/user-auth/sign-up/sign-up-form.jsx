import React, { useState, useRef, useEffect, useReducer } from 'react';
import { useCountries } from 'hooks/';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PinModal } from 'features/user-auth';
import submitForm from './submit-form.js';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';

function formErrorsReducer(formErrors, action) {

}

export function SignUpForm() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    const [usernameError, setUsernameError] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [sexError, setSexError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termsError, setTermsError] = useState(false);

    const helpers = {
        usernameError: (helperText) => setUsernameError(helperText),
        firstNameError: (helperText) => setFirstNameError(helperText),
        lastNameError: (helperText) => setLastNameError(helperText),
        dateError: (helperText) => setDateError(helperText),
        countryError: (helperText) => setCountryError(helperText),
        sexError: (helperText) => setSexError(helperText),
        emailError: (helperText) => setEmailError(helperText),
        passwordError: (helperText) => setPasswordError(helperText),
        termsError: (helperText) => setTermsError(helperText),
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        Object.values(helpers).forEach((helperFunction) => {
            helperFunction(false);
        });

        setLoading(true);
        let response = await submitForm(formData, date);
        setLoading(false);
        let data = response.data;

        if (data) {
            if (data !== 'success') {
                data.map((item) => {
                    helpers[`${item.error}`](item.helperText);
                })
            } else {
                Object.values(helpers).forEach((helperFunction) => {
                    helperFunction(false);
                });
                handleOpen();
            }
        }
    }

    const disableFutureDates = (date) => {
        const today = new Date();
        return date > today;
    };

    useEffect(function() {
        (async function() {
            const response = await useCountries();
            setCountries(response);
        })();
    }, [])

    return (
        <Box 
            component="form" 
            noValidate 
            autoComplete="off"      
            sx={{
                '& .MuiTextField-root': { mb: 1.5 },
                mt: 1
            }}
            onSubmit={handleSubmit}
            id="signup-form"
        >
            <PinModal open={open} handleOpen={handleOpen} handleClose={handleClose} />
            <TextField
                fullWidth
                size="small"
                id="username"
                name="username"
                label="Username"
                autoFocus
                error={usernameError ? true : false}
                helperText={usernameError}
            />
            <TextField 
                fullWidth
                size="small"
                id="firstName"
                name="firstName"
                label="First name"
                error={firstNameError ? true: false}
                helperText={firstNameError}
            />
            <TextField 
                fullWidth
                size="small"
                id="lastName"
                name="lastName"
                label="Last name"
                error={lastNameError ? true: false}
                helperText={lastNameError}
            />
            <DatePicker
                label="Date of birth"
                name="dateOfBirth"
                value={date}
                onChange={(e) => setDate(e)}
                shouldDisableDate={disableFutureDates}
                slotProps={{ textField: { fullWidth: true, size: "small", helperText: dateError && dateError , error: dateError ? true : false }, }}
            />
            <TextField
                fullWidth
                size="small"
                id="country"
                name="country"
                select
                label="Country"
                defaultValue=""
                error={countryError ? true: false}
                helperText={countryError}
            >
                {countries.map((country) => {
                    return <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                })}
            </TextField>
            <TextField
                fullWidth
                size="small"
                id="sex"
                name="sex"
                select
                label="Sex"
                defaultValue=""
                error={sexError ? true : false}
                helperText={sexError}
            >
                <MenuItem key="male" value="Male">
                    Male
                </MenuItem>
                <MenuItem key="female" value="Female">
                    Female
                </MenuItem>
            </TextField>
            <TextField
                fullWidth
                size="small"
                id="email"
                name="email"
                label="Email"
                error={emailError ? true : false}
                helperText={emailError}
            />
            <TextField
                fullWidth
                size="small"
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordError ? true : false}
                helperText={passwordError}
            />
            <TextField
                fullWidth
                size="small"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                type="password"
            />
            <FormControl >
                <FormControlLabel
                    control={<Checkbox size="small" name="terms" value="agree" />}
                    label={
                    <span style={{ fontSize: '14px' }}>
                        I agree with StudyFil's <Link style={{ color: '#1999E3', fontSize: '14px' }} to="/legal/terms" target="_blank" >Terms and Conditions</Link>
                    </span>
                    }
                />
                {termsError && <FormHelperText sx={{ color: '#D7392F', m: 0 }}>{termsError}</FormHelperText >}
            </FormControl>
            {loading ? 
                <CircularProgress sx={{ display: 'block', margin: '10px auto' }}/>
            :
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                >
                    Sign Up
                </Button>
            }
        </Box>
    )
}