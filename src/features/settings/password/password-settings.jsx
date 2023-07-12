import { useState, useRef } from 'react';
import { SettingsCss } from 'stylesheets/settings';
import { submitPassword } from './submit-password.js';
import { validateTime } from '@mui/x-date-pickers/internals';
import { useUserContext } from 'context/';
import PasswordValidator from './password-validator.js';
import { SuccessAlert } from 'features/alerts';


export function PasswordSettings() {
    const { user } = useUserContext();
    const passwordValidator = new PasswordValidator;
    const successRef = useRef(null);
    const [seed, setSeed] = useState(1);
    const [success, setSuccess] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNew, setConfirmNew] = useState('');

    const [currentPasswordError, setCurrentPasswordError] = useState();
    const [newPasswordError, setNewPasswordError] = useState()
    const [confirmPasswordError, setConfirmPasswordError] = useState();



    const helpers = {
        currentPasswordError: (value) => setCurrentPasswordError(value),
        newPasswordError: (value) => setNewPasswordError(value),
        confirmPasswordError: (value) => setConfirmPasswordError(value)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setCurrentPasswordError(false);
        const response = await submitPassword(user.id, currentPassword, newPassword, confirmNew);
        if (response.hasErrors) {
            setSuccess(false);
            response.errors.map((error) => {
                helpers[error.error](error.helperText)
            });
        } else {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNew('');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 1000);
        }
    }

    return (
        <form className={SettingsCss.accountAndPassword} onSubmit={handleSubmit}>
            {success && <SuccessAlert message={'Password changed'} />}
            <label>
                <p>Current password </p>
                <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} />
                {currentPasswordError && <p className={SettingsCss.error}>{currentPasswordError}</p>}
            </label>
            <label>
                <p>New password</p>
                <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => passwordValidator.validateNewPassword(e, setNewPasswordError, setNewPassword)} />
                {newPasswordError && <p className={SettingsCss.error}>{newPasswordError}</p>}
            </label>
            <label>
                <p>Confirm new password</p>
                <input 
                    type="password" 
                    value={confirmNew} 
                    onChange={(e) => passwordValidator.validateConfirmNewPassword(e, setConfirmPasswordError, setConfirmNew, newPassword)} />
                {confirmPasswordError && <p className={SettingsCss.error}>{confirmPasswordError}</p>}
            </label>
            <div>
                <input type="submit" value="Change password" className={SettingsCss.saveButton} />
            </div>
        </form>
    )
}