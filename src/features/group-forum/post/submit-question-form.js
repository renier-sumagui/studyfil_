import Axios from 'axios';

async function submitQuestionForm(userId, groupId, content) {
    if (content) {
        // post
        const response = await Axios.post('http://localhost:8000/posts/create', { userId, groupId, content }, { withCredentials: true });
        return response.data;
    } else {
        return;
    }
}

export default submitQuestionForm;