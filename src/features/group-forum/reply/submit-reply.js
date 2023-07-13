import Axios from 'axios';

async function submitReply(userId, content, commentId, groupId) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await Axios.post('https://studyfil-api.onrender.com/replies/create', { userId, content, commentId, groupId, timezone }, { withCredentials: true });
}

export { submitReply }