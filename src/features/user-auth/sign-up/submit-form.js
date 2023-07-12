import Axios from 'axios';

async function submitForm(formData, date) {
    const newDate = date ? date.$d : null;
    const currentDate = new Date();
    const sixteenYearsAgo = new Date();
    
    sixteenYearsAgo.setFullYear(currentDate.getFullYear() - 16);

    const form = {
        username: formData.get('username'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        date: date ? true : false,
        year: newDate && newDate.getFullYear(),
        month: newDate && newDate.getMonth() + 1,
        day: newDate && newDate.getDate(),
        country: formData.get('country'),
        sex: formData.get('sex'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        terms: formData.get('terms')
    };

    let errors = [];

    /**
     * Validate USERNAME
     */
    if (form.username.length <= 0) {
        errors.push({ error: 'usernameError', helperText: 'Username is required.' });
    } else if (form.username.length > 15 || form.username.length < 4) {
        errors.push({ error: 'usernameError', helperText: 'Username must be at least 4 characters and no more than 15 characters long' });
    }

    /**
     * Validate FIRST NAME
     */
    if (form.firstName.length <= 0) {
        errors.push({ error: 'firstNameError', helperText: 'First name is required' });
    }

    /**
     * Validate LAST NAME
     */
    if (form.lastName.length <= 0) {
        errors.push({ error: 'lastNameError', helperText: 'Last name is required' });
    }

    /**
     * Validate DATE 
     */
    if (date) {
        if (
            newDate.getFullYear() < sixteenYearsAgo.getFullYear() ||
            (newDate.getFullYear() === sixteenYearsAgo.getFullYear() &&
            newDate.getMonth() < sixteenYearsAgo.getMonth()) ||
            (newDate.getFullYear() === sixteenYearsAgo.getFullYear() &&
            newDate.getMonth() === sixteenYearsAgo.getMonth() &&
            newDate.getDate() <= sixteenYearsAgo.getDate())
        ) {
            // console.log("Selected date is greater than or equal to 16 years ago");
        } else {
            errors.push({ error: 'dateError',  helperText: 'Users must be 16 years old and above' });
        }
    } else {
        errors.push({ error: 'dateError',  helperText: 'Date is required' });
    }

    /**
     * Validate COUNTRY
     */
    if (form.country.length <= 0) {
        errors.push({ error: 'countryError',  helperText: 'Country is required' });
    }

    /**
     * Validate SEX
     */
    if (form.sex.length <= 0) {
        errors.push({ error: 'sexError',  helperText: 'Sex is required' });
    }

    /**
     * Validate EMAIL
     */
    if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.push({ error: 'emailError',  helperText: 'Please enter a valid email address' });
    }
    /**
     * Validate Password
     */
    if (form.password.length <= 0) {
        errors.push({ error: 'passwordError',  helperText: 'Password is required' });
    } else {
        if (form.password.length < 8) {
            errors.push({ error: 'passwordError',  helperText: 'Password must contain at least 8 characters' });
        }
    }
    if (form.password !== form.confirmPassword) {
        errors.push({ error: 'passwordError',  helperText: 'Passwords must match' });
    }

    /**
     * Validate TERMS
     */
    if (!form.terms) {
        errors.push({ error: 'termsError', helperText: 'You must agree to the terms and conditions to create an account' });
    }
    
    /**
     * Check if `errors` variable is empty, if true, return the errors, if false, pass it to the backend
     */
    if (errors.length > 0) {
        return {data: errors};
    }

    try {
        const response = await Axios.post('https://studyfil-api.onrender.com/signup', { form }, { withCredentials: true });
        return response;
    } catch (error) {
        throw new Error('Failed to submit form.');
    }

}

export default submitForm;