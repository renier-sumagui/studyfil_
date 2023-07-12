import Axios from 'axios';

async function useMembers(groupId) {
    const response = await Axios.get(`http://localhost:8000/groups/${groupId}/members`);
    return response.data;
}

export { useMembers };