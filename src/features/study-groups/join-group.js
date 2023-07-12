import Axios from 'axios';

async function joinGroup(userId, groupId) {
    const response = await Axios.post(`https://studyfil-api.onrender.com/groups/join`, { userId, groupId }, { withCredentials: true });
    return response.data;
}

export { joinGroup };