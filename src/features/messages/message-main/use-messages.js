import Axios from 'axios';

async function useMessages(groupId, page) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/messages/${groupId}?page=${page}`);
    return response.data;
}

export { useMessages };