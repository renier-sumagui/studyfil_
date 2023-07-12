import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function logout() {
    const navigate = useNavigate();

    await Axios.get('https://studyfil-api.onrender.com/user/logout', { withCredentials: true });
    navigate('/signin');
}

export { logout };