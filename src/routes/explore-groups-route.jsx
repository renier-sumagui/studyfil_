import { useEffect, useState, createContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { StudyGroups } from 'features/study-groups';
import { useUserContext } from 'context/';
import { useDiscoverGroups, useGroupsBasedOnTopics } from 'features/study-groups';
import { Circular } from 'features/loading';



function ExploreGroupsRoute() {
    const { user } = useUserContext();
    const [seed, setSeed] = useState(1);

    const [basedOnUsers, setBasedOnUsers] = useState();
    const [basedOnTopics, setBasedOnTopics] = useState();

    useEffect(() => {

        (async function() {
            setBasedOnUsers(null);
            const groups = await useDiscoverGroups(user.id);
            if (groups.length > 0) {
                setBasedOnUsers(groups);
            }
        })();
        (async function() {
            setBasedOnTopics(null);
            const groups = await useGroupsBasedOnTopics(user.id);
            if (groups.length > 0) {
                setBasedOnTopics(groups);
            }
        })();
    }, [seed])

    return (
        <>
            {basedOnUsers ? <StudyGroups heading="Groups you might like" groups={basedOnUsers} seed={seed} setSeed={setSeed} /> : null}
            {basedOnTopics && <StudyGroups heading="Based on topics you like" groups={basedOnTopics} seed={seed} setSeed={setSeed} />}
            {!basedOnUsers && !basedOnTopics ? <h3>No groups yet</h3> : null}
        </>
    )
}

export default ExploreGroupsRoute;