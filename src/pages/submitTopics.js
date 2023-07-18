import Axios from 'axios';

async function submitTopics(topics) {
    let tempTopics = [];
    for (const row in topics) {
        tempTopics.push(topics[row]);
    }
    const response = await Axios.post('https://studyfil-api.onrender.com/user/topic/add');
}

export default submitTopics;