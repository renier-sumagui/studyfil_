import Axios from 'axios';
import { getCurrentDatetime } from 'src/utils';

async function joinGroup(userId, groupId) {
    const response = await Axios.post(`https://studyfil-api.onrender.com/groups/join`, { userId, groupId }, { withCredentials: true });
    Axios.post('https://studyfil-api.onrender.com/user/notification/add', { 
        userWhoNotified: userId,
        referenceId: groupId,
        eventId: 6,
        groupId: groupId,
        datetime: getCurrentDatetime()
    }, { withCredentials: true });
    return response.data;
}

export { joinGroup };