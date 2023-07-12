import Axios from 'axios';
import { getTimePassed } from 'features/group-forum';

async function useComments(postId) {
    const response = await Axios.get(`http://localhost:8000/comments/post/${postId}`);
    if (response.data.hasComments) {
        const comments = response.data.comments.map((comment) => {
            return { 
                id: comment.id, 
                username: comment.username,
                fullName: comment.full_name,
                country: comment.country,
                content: comment.content,
                timePosted: getTimePassed(comment.time_posted),
                upvotes: comment.upvotes,
                downvotes: comment.downvotes
            }
        });
        return { hasComments: true, comments };
    } else{
        return { hasComments: false }
    }
}

export { useComments };