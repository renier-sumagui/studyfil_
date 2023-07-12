import Axios from 'axios'

async function submitResolve(isResolved, postId) {
    await Axios.post('http://localhost:8000/posts/update', { isResolved, postId }, { withCredentials: true });
}

export { submitResolve };