import Axios from 'axios';

async function submitVote(id, voteType, isComment, userId) {
    await Axios.post('https://studyfil-api.onrender.com/votes/', { id, voteType, isComment, userId }, { withCredentials: true })
}

export { submitVote };