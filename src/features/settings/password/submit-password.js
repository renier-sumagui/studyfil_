import Axios from 'axios';

async function submitPassword(userId, currentPassword, newPassword, confirmNew) {
    const errors = [];

    if (currentPassword.length <= 0) {
        errors.push({ error: 'currentPasswordError', helperText: 'Password is required' });
    }

    if (newPassword.length <= 0) {
        errors.push({ error: 'newPasswordError', helperText: 'New password is required'});
    } else {
        if (newPassword !== confirmNew) {
            errors.push({ error: 'confirmPasswordError', helperText: 'Passwords must match'});
        }
    }

    if (errors.length > 0) {
        return { hasErrors: true, errors: errors }
    }

    const response = await Axios.post('https://studyfil-api.onrender.com/user/changepassword', 
        { 
            userId, 
            currentPassword,
            newPassword, 
            confirmNew
        },
        {
            withCredentials: true
        }
    );
    return response.data;

}

export { submitPassword };''