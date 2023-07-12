import Axios from 'axios'

async function submitResolve(isResolved, postId) {
    await Axios.post('https://studyfil-api.onrender.com/posts/update', { isResolved, postId }, { withCredentials: true });
}

export { submitResolve };