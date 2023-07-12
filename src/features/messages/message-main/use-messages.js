import Axios from 'axios';

async function useMessages(groupId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/messages/${groupId}`);
    return response.data;
}

export { useMessages };