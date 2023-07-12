class PasswordValidator {
    validateNewPassword(event, setNewPasswordError, setNewPassword) {
        const value = event.target.value;
        setNewPassword(value);
        if (value.length < 8) {
            setNewPasswordError('Password must be at least 8 characters long.')
        } else {
            setNewPasswordError(false);
        }
    }

    validateConfirmNewPassword(event, setConfirmPasswordError, setConfirmNew, newPassword) {
        const value = event.target.value;
        setConfirmNew(value);
        if (value !== newPassword) {
            setConfirmPasswordError('Passwords must match.');
        } else {
            setConfirmPasswordError(false);
        }
    }
}

export default PasswordValidator;