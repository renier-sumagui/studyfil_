import Axios from 'axios';

async function useMessages(groupId) {
    const response = await Axios.get(`http://localhost:8000/messages/${groupId}`);
    return response.data;
}

export { useMessages };