import Axios from 'axios';

async function useMembers(groupId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/groups/${groupId}/members`);
    return response.data;
}

export { useMembers };