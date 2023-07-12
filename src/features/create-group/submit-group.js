import Axios from 'axios';

async function submitGroup(userId, groupName, topicId, memberCount) {
    console.log(userId, groupName, topicId, memberCount);
    const response = await Axios.post('https://studyfil-api.onrender.com/groups/add', { userId, groupName, topicId, memberCount }, { withCredentials: true });
    return response.data.success;
}

export default submitGroup;