import Axios from 'axios';
import { getTimePassed } from 'features/group-forum';

async function usePost(groupId, postId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/posts/group/${groupId}/${postId}`);
    const temp = response.data.post;
    const post = {...temp, time_posted: getTimePassed(temp.time_posted)}
    return { post: post }
}

export { usePost };