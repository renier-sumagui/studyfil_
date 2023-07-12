import Axios from 'axios';

async function useJoinedGroups(userId) {
    let response = await Axios.post('https://studyfil-api.onrender.com/groups/joined', { userId }, { withCredentials: true });
    return response;
}

export { useJoinedGroups };