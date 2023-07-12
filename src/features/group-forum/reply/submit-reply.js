import Axios from 'axios';

async function submitReply(userId, content, commentId, groupId) {
    await Axios.post('https://studyfil-api.onrender.com/replies/create', { userId, content, commentId, groupId }, { withCredentials: true });
}

export { submitReply }