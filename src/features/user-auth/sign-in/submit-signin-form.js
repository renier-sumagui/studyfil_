import Axios from 'axios';

async function submitSignInForm(email, password) {
    const errors = [];

    /* ----------------------------------- VALIDATE EMAIL ----------------------------------- */
    if (email.length <= 0 ) {
        errors.push({ error: 'emailError', helperText: 'Email is required'});
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.push({ error: 'emailError' , helperText: 'Please enter a valid email' });
    }


    /* ----------------------------------- VALIDATE PASSWORD ----------------------------------- */
    if (password.length <= 0) {
        errors.push({ error: 'passwordError', helperText: 'Password is required'});
    }

    if (errors.length > 0) {
        return { data: {errors: errors, success: false} };
    }

    const response = await Axios.post('https://studyfil-api.onrender.com/user/signin', { email, password }, { withCredentials: true });

    return response;
}

export default submitSignInForm;