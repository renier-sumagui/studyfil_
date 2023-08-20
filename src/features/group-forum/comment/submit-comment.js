import Axios from 'axios';
import { getCurrentDatetime } from 'src/utils';

async function submitComment(userId, postId, comment, groupId) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await Axios.post('https://studyfil-api.onrender.com/comments/create', { userId, postId, comment, groupId, timezone }, { withCredentials: true });
    Axios.post('https://studyfil-api.onrender.com/user/notification/add', { 
        userWhoNotified: userId,
        referenceId: postId,
        eventId: 3,
        groupId: groupId,
        datetime: getCurrentDatetime()
    }, { withCredentials: true });
    return response.data;
}

export { submitComment };