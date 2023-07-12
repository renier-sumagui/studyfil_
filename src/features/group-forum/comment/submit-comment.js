import Axios from 'axios';

async function submitComment(userId, postId, comment, groupId) {
    const response = await Axios.post('https://studyfil-api.onrender.com/comments/create', { userId, postId, comment, groupId }, { withCredentials: true });
    return response.data;
}

export { submitComment };