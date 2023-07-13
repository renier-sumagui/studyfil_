import Axios from 'axios';

async function submitComment(userId, postId, comment, groupId) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timezone);
    const response = await Axios.post('https://studyfil-api.onrender.com/comments/create', { userId, postId, comment, groupId, timezone }, { withCredentials: true });
    return response.data;
}

export { submitComment };