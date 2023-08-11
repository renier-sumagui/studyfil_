import Axios from 'axios';

async function submitPin(pin) {
    const response = await Axios.post('https://studyfil-api.onrender.com/auth/pin', {pin}, { withCredentials: true });
    return response.data;
}

export default submitPin;