import Axios from 'axios';
import { getCurrentDatetime } from 'src/utils';

async function submitReply(userId, content, commentId, groupId, postId) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await Axios.post('https://studyfil-api.onrender.com/replies/create', { userId, content, commentId, groupId, timezone }, { withCredentials: true });
    Axios.post('https://studyfil-api.onrender.com/user/notification/add', { 
        userWhoNotified: userId,
        referenceId: commentId,
        eventId: 4,
        groupId: groupId,
        datetime: getCurrentDatetime()
    }, { withCredentials: true });

}

export { submitReply }