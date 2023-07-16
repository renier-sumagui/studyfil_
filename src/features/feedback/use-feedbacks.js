import Axios from 'axios';
import { getTimePassed } from 'features/group-forum';

async function useFeedbacks() {
    const response = await Axios.get('https://studyfil-api.onrender.com/feedbacks/all');
    const feedbacks = response.data;
    
    let newFeedbacks = feedbacks.map((feedback) => {
        return {...feedback, created_at: getTimePassed(feedback.created_at)};
    } );

    return newFeedbacks;
}

export { useFeedbacks };