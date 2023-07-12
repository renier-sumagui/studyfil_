import Axios from 'axios';
import { getTimePassed } from 'src/utils';

async function useGroups(searchType, keyword, userId) {
    console.log(searchType, keyword);
    const response = await  Axios.get(`https://studyfil-api.onrender.com/groups/search?${searchType}=${keyword}&user=${userId}`);

    if (response.data.hasGroups) {
        console.log(response.data.groups);
        const groups = response.data.groups;
        const joinedGroups = response.data.joinedGroups;
        console.log(joinedGroups);
        const tempGroups = groups.map((group) => { return {...group, created_at: getTimePassed(group.created_at)} });
        return { hasGroups: true, groups: tempGroups, joinedGroups: joinedGroups };
    } else {
        return { hasGroups: false }
    }


}

export { useGroups };