import Axios from 'axios';

async function submitQuestionForm(userId, groupId, content) {
    if (content) {
        // post
        const response = await Axios.post('https://studyfil-api.onrender.com/posts/create', { userId, groupId, content }, { withCredentials: true });
        return response.data;
    } else {
        return;
    }
}

export default submitQuestionForm;