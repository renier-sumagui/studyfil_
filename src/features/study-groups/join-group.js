import Axios from 'axios';

async function joinGroup(userId, groupId) {
    const response = await Axios.post(`http://localhost:8000/groups/join`, { userId, groupId }, { withCredentials: true });
    return response.data;
}

export { joinGroup };