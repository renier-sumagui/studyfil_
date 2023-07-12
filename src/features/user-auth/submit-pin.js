import Axios from 'axios';

async function submitPin(pin) {
    const response = await Axios.post('https://studyfil-api.onrender.com/auth/pin', {pin}, { withCredentials: true });

    if (!response.data.success) {
        return response.data;
    } else {
        const result = await Axios.get('https://studyfil-api.onrender.com/user/add', { withCredentials: true });
        return result.data;
    }
}

export default submitPin;