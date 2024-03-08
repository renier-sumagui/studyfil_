import { useRef, useEffect, useState } from 'react';
import { StudyGroups } from 'features/study-groups';
import { useUserContext } from 'context/';
import { useDiscoverGroups, useGroupsBasedOnTopics, useMoreGroups } from 'features/study-groups';
import { StudyGroupsSkeleton } from 'features/study-groups';

function getGroupIds(groups) {
    const groupIds = groups.map((group) => group.id);
    return groupIds;
}

function ExploreGroupsRoute() {
    const { user } = useUserContext();
    const [seed, setSeed] = useState(1);

    const [basedOnUsers, setBasedOnUsers] = useState([]);
    const [basedOnTopics, setBasedOnTopics] = useState([]);
    const [moreGroups, setMoreGroups] = useState([]);

    const tempMoreGroups = useRef([]);

    const loadUserBased = useRef(true);
    const loadTopicBased = useRef(true);
    const loadMoreGroups = useRef(true);

    const [loading, setLoading] = useState(true);
    const [lineLoad, setLineLoad] = useState(false);

    const page = useRef(1);

    async function handleScroll() {
        const main = document.getElementById("main-section");
        if (main.scrollTop + main.clientHeight !== main.scrollHeight || loading || lineLoad) {
            return;
        } else {
            setLineLoad(true);
            if (loadUserBased.current) {
                const userBasedGroups = await useDiscoverGroups(user.id, page.current);
                if (userBasedGroups.length > 0) {
                    const groupIds = getGroupIds(userBasedGroups);
                    tempMoreGroups.current = [...tempMoreGroups.current, ...groupIds];
                    setBasedOnUsers(prev => [...prev, ...userBasedGroups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                    page.current = page.current + 1;
                } else {
                    loadUserBased.current = false;
                    page.current = 1;
                    const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page.current);
                    if (topicBasedGroups.length > 0) {
                        const groupIds = getGroupIds(topicBasedGroups);
                        tempMoreGroups.current = [...tempMoreGroups.current, ...groupIds];
                        setBasedOnTopics(prev => [...prev, ...topicBasedGroups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                        page.current = page.current + 1;
                        if (topicBasedGroups.length < 12) {
                            page.current = 1;
                            const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                            if (groups.length > 0) {
                                setMoreGroups(prev => [...prev, ...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                                page.current = page.current + 1;
                            } else {
                                loadMoreGroups.current = false;
                            }
                        }
                    } else {
                        loadTopicBased.current = false;
                        const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                        if (groups.length > 0) {
                            const groupIds = getGroupIds(groups);
                            setMoreGroups(prev => [...prev, ...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                            page.current = page.current + 1;
                        } else {
                            loadMoreGroups.current = false;
                        }
                    }
                }
            } else if (loadTopicBased.current) {
                const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page.current);
                if (topicBasedGroups.length > 0) {
                    const groupIds = getGroupIds(topicBasedGroups);
                    tempMoreGroups.current = [...tempMoreGroups.current, ...groupIds];
                    setBasedOnTopics(prev => [...prev, ...topicBasedGroups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                } else {
                    loadTopicBased.current = false;
                    page.current = 1;
                    const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                    if (groups.length > 0) {
                        setMoreGroups(prev => [...prev, ...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                        page.current = page.current + 1;
                    } else {
                        loadMoreGroups.current = false;
                    }
                }
            } else if (loadMoreGroups.current) {
                const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                if (groups.length > 0) {
                    setMoreGroups(prev => [...prev, ...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                    page.current = page.current + 1;
                } else {
                    loadMoreGroups.current = false;
                }
            }
            setLineLoad(false);
        }
    }
      


    useEffect(() => {
        async function loadGroups() {
    setLoading(true);
    const userBasedGroups = await useDiscoverGroups(user.id, page.current);
    if (userBasedGroups.length > 0) {
        addGroupsWithKeys(userBasedGroups, setBasedOnUsers);
        // ... rest of the logic
    }
    // ... rest of the logic
}

useEffect(() => {
    loadGroups();
}, []);



    }, [])

    useEffect(() => {
        const main = document.getElementById("main-section");
        main.addEventListener('scroll', handleScroll);
        return () => {
            main.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);
    
    return (
        <>
            {basedOnUsers.length > 0 && 
            <StudyGroups 
                heading="Study groups you might like" 
                groups={basedOnUsers} 
                seed={seed} 
                setSeed={setSeed} 
                setStudyGroups={setBasedOnUsers}
            />}
            {basedOnTopics.length > 0 && 
            <StudyGroups 
                heading="Study groups based on topics you like" 
                groups={basedOnTopics} 
                seed={seed} 
                setSeed={setSeed} 
                setStudyGroups={setBasedOnTopics} 
            />}
            {moreGroups.length > 0 && 
            <StudyGroups 
                heading={basedOnUsers.length < 1 && basedOnTopics.length < 1 ? "Study groups" : "More study groups"} 
                groups={moreGroups} 
                seed={seed} 
                setSeed={setSeed} 
                setStudyGroups={setMoreGroups} 
            />}
            {loading ? <StudyGroupsSkeleton headerWidth={260} /> : !basedOnUsers && !basedOnTopics && !moreGroups ? <h3>No groups yet</h3> : null}
        </>
    )
}

export default ExploreGroupsRoute;