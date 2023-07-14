import Axios from 'axios';

async function useDiscoverGroups(userId) {
    // const response = await Axios.post('http://localhost:8000/groups/discover', { userId }, { withCredentials: true });

    const tempResponse = await Axios.get(`https://studyfil-api.onrender.com/groups/recommendations/${userId}`);

    let groups = [];
    const recommendations = tempResponse.data.recommendedStudyGroups;

    for (const key in recommendations) {
        recommendations[key].map((group) => groups.push(group));
    }

    return groups;
}

async function useGroupsBasedOnTopics(userId) {
    const response = await Axios.post('https://studyfil-api.onrender.com/groups/topics', { userId }, { withCredentials: true });
    return response.data.groups;
}

export { useDiscoverGroups, useGroupsBasedOnTopics };