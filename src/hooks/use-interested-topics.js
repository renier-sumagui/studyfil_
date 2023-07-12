import Axios from 'axios';

async function useInterestedTopics(userId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/topics//${userId}/interest`);
    return response.data;
}

export { useInterestedTopics };