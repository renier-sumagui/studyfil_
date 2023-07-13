import Axios from 'axios';

async function submitGroup(userId, groupName, topicId, memberCount) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await Axios.post('https://studyfil-api.onrender.com/groups/add', { userId, groupName, topicId, memberCount, timezone }, { withCredentials: true });
    return response.data.success;
}

export default submitGroup;