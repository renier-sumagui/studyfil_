import Axios from 'axios';

async function submitNewTopic(theory, facts, formal, topic) {
    console.log(theory, facts, formal);
    if (theory && facts && formal) {
        await Axios.post('https://studyfil-api.onrender.com/topics/newtopic', { topic, isAcademic: 1 }, { withCredentials: true });
    } else {
        await Axios.post('https://studyfil-api.onrender.com/topics/newtopic', { topic, isAcademic: 0 }, { withCredentials: true });
    }
}

export default submitNewTopic;