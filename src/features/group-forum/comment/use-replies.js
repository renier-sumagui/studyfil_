import Axios from 'axios';
import { getTimePassed } from 'features/group-forum';

async function useReplies(commentId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/replies/comment/${commentId}`);


    if (response.data.hasReplies) {
        const replies = response.data.replies.map((reply) => {
            return { 
                id: reply.id, 
                username: reply.username,
                fullName: reply.full_name,
                country: reply.country,
                content: reply.content,
                timePosted: getTimePassed(reply.time_posted),
                upvotes: reply.upvotes,
                downvotes: reply.downvotes
            }
        });
        return { hasReplies: true, replies };
    } else{
        return { hasReplies: false }
    }
}

export { useReplies };