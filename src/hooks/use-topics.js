import Axios from 'axios';

async function useTopics() {
    const response = await Axios.get('https://studyfil-api.onrender.com/topics/all');

    const topics = {};
    const tempTopics = response.data.topics;

    tempTopics.map((topic) => {
        const temp = topic.name;
        topics[`${temp.toLowerCase()}`] = topic;
    })
    return topics;
}

export { useTopics };