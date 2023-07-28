import Axios from 'axios';

async function submitTopics(userId, interestedTopics) {
    await Axios.post('https://studyfil-api.onrender.com/topics/interest/update', { userId, interestedTopics }, { withCredentials: true });
    return;
}

export { submitTopics };