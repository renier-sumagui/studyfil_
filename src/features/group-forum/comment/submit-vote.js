import Axios from 'axios';

async function submitVote(id, voteType, isComment, userId) {
    const response = await Axios.post('https://studyfil-api.onrender.com/votes/', { id, voteType, isComment, userId }, { withCredentials: true })
    return response.data.success;
}

export { submitVote };