import Axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsCss } from 'stylesheets/settings';
import { useUserContext } from 'src/context';
import { useAccountInformation } from './use-account-information.js';
import { SuccessAlert } from 'features/alerts';
import { submitAccountInformation } from './submit-account-information.js';

function ConfirmModal({ modalRef, closeModal }) {
    const navigate = useNavigate();
    
    async function handleDelete() {
        await Axios.delete('https://studyfil-api.onrender.com/user/delete', { withCredentials: true });
        // await Axios.get('http://localhost:8000/user/logout', { withCredentials: true });
        closeModal();
        navigate('/signin');
    }

    return (
        <dialog ref={modalRef}>
            <p>Are you sure to delete your account?</p>
            <div className="flex justifySpaceBetween" style={{ marginTop: '20px' }}>
                <button className="buttonDanger" onClick={handleDelete}>Yes</button>
                <button className="buttonSuccess" onClick={() => closeModal()}>No</button>
            </div>
        </dialog>
    )
}

function DeleteAccountButton() {
    const modalRef = useRef(null);

    function openModal() {
        modalRef.current.showModal();
    }
    function closeModal() {
        modalRef.current.close();
    }

    return (
        <>
            <button className={SettingsCss.deleteAccBtn} onClick={openModal}>Delete Account</button>
            <ConfirmModal modalRef={modalRef} closeModal={closeModal} />
        </>
    )
}

export function AccountInformation() {
    const { user } = useUserContext();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [sex, setSex] = useState('');

    const [origFirstName, setOrigFirstName] = useState();
    const [origLastName, setOrigLastName] = useState();

    const [disabled, setDisabled] = useState(true);
    const [success, setSuccess] = useState(false);
    const [seed, setSeed] = useState(1); 

    function handleChange(e, action) {
        const callbacks = {
            firstName: () => { 
                setFirstName(e.target.value);
                if (e.target.value !== origFirstName || lastName !== origLastName) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            },
            lastName: () => {
                setLastName(e.target.value);
                if (e.target.value !== origLastName || firstName !== origFirstName) {
                    setDisabled(false);
                } else {
                    setDisabled(true);
                }
            }
        }
        callbacks[action]();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!disabled) {
            await submitAccountInformation(user.id, firstName, lastName);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 1000);
            setSeed(Math.random());
        }
        return;
    }


    useEffect(() => {
        (async function() {
            const accountInformation = await useAccountInformation(user.id);

            setUsername(accountInformation.username)
            setEmail(accountInformation.email);
            setFirstName(accountInformation.first_name);
            setLastName(accountInformation.last_name);
            setBirthdate(accountInformation.birthdate);
            setSex(accountInformation.sex);

            setOrigFirstName(accountInformation.first_name);
            setOrigLastName(accountInformation.last_name);
        })()
    }, [seed])


    return (
        <form className={SettingsCss.accountAndPassword} onSubmit={handleSubmit}>
            {success && <SuccessAlert message={"Account information updated"} />}
            <label>
                <p>Username</p>
                <input type="text" readOnly value={username} />
            </label>
            <label>
                <p>Email</p>
                <input type="text" readOnly value={email}  />
            </label>
            <label>
                <p>First name</p>
                <input type="text" value={firstName} onChange={(e) => handleChange(e, 'firstName')} />
            </label>
            <label>
                <p>Last name</p>
                <input type="text" value={lastName} onChange={(e) => handleChange(e, 'lastName')} />
            </label>
            <label>
                <p>Birthdate</p>
                <input type="text" value={birthdate} readOnly />
            </label>
            <label>
                <p>Sex</p>
                <input type="sex" value={sex} readOnly />
            </label>
            <div className='flex justifySpaceBetween'>
                <button 
                    type="submit" 
                    className={SettingsCss.saveButton} 
                    disabled={disabled}
                    style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
                >
                    Save
                </button>
                <DeleteAccountButton />
            </div>
        </form>
    )
}