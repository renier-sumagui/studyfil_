import Axios from 'axios';
import { formatDate } from 'src/utils';

async function useAccountInformation(userId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/user/${userId}`);

    const user = response.data;

    user.birthdate = formatDate(user.birthdate);

    return user;
}

export { useAccountInformation };