import Axios from 'axios';

async function usePosts(groupId) {
    const response = await Axios.get(`https://studyfil-api.onrender.com/posts/group/${groupId}`);
    if (response.data.hasPosts) {
        const posts = response.data.posts.map((post) => {
            return { 
                        id: post.id, 
                        username: post.username, 
                        fullName: post.full_name, 
                        country: post.country, 
                        content: post.content,
                        answers: post.answers, 
                        timePosted: getTimePassed(post.time_posted),
                        isResolved: post.is_resolved
                    }
        });
        return { hasPosts: true, posts: posts }
    }
    return response.data;
}


function getTimePassed(timestamp) {
    const postTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDiffInSeconds = Math.floor((currentTime - postTime) / 1000);

    if (timeDiffInSeconds < 60) {
        return 'just now';
    } else if (timeDiffInSeconds < 3600) {
        const minutes = Math.floor(timeDiffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 86400) {
        const hours = Math.floor(timeDiffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(timeDiffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
}

export { usePosts, getTimePassed };