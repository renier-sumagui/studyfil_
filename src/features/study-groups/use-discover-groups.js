import Axios from 'axios';

async function useDiscoverGroups(userId, page) {
    const response = await Axios.get(`https://studyfil-api.onrender.com//groups/recommendations/${userId}?page=${page}`);
    const recommendations = response.data.groups;
    return recommendations;
}

async function useGroupsBasedOnTopics(userId, page) {
    const response = await Axios.post(`https://studyfil-api.onrender.com//groups/topics`, { userId, page }, { withCredentials: true });
    return response.data.groups;
}

async function useMoreGroups(userId, groupIds, page) {
    const response = await Axios.post('https://studyfil-api.onrender.com//groups/more', { userId, groupIds, page}, { withCredentials: true });
    return response.data.groups;
}

export { useDiscoverGroups, useGroupsBasedOnTopics, useMoreGroups };