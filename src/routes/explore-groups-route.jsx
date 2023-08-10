import { useRef, useEffect, useState, createContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { StudyGroups } from 'features/study-groups';
import { useUserContext } from 'context/';
import { useDiscoverGroups, useGroupsBasedOnTopics, useMoreGroups } from 'features/study-groups';
import { AbsoluteCircular } from 'features/loading';
import { StudyGroupsSkeleton } from 'features/study-groups';
import { LoaderLine } from 'features/loading';

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

    const page = useRef(1);
    // const [groupIds, setGroupIds] = useState([]);


    async function handleScroll() {
        const main = document.getElementById("main-section");
        if (main.scrollTop + main.clientHeight !== main.scrollHeight || loading) {
          return;
        } else {
            setLoading(true);
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
        }
        setLoading(false);
    }
      


    useEffect(() => {
        const main = document.getElementById("main-section");
        (async function() {
            setLoading(true);
            const userBasedGroups = await useDiscoverGroups(user.id, page.current);
            /* If `userBasedGroups` has items, update `basedOnUsers`, else set `loadUserBased.current` to false */
            if (userBasedGroups.length > 0) {
                setLoading(false);
                const groupIds = getGroupIds(userBasedGroups);
                tempMoreGroups.current = [...tempMoreGroups.current, ...groupIds];
                setBasedOnUsers([...userBasedGroups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                page.current = page.current + 1;
                if (userBasedGroups.length < 12) {
                    loadUserBased.current = false;
                    page.current = 1;
                    const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page.current);
                    if (topicBasedGroups.length > 0) { /* If topic based groups has groups, update `basedOnTopics` */
                        const groupIds = getGroupIds(topicBasedGroups);
                        setLoading(false);
                        tempMoreGroups.current = [...tempMoreGroups.current, ...groupIds];
                        setBasedOnTopics([...topicBasedGroups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                        page.current = page.current + 1;
                        if (topicBasedGroups.length < 12) {
                            loadTopicBased.current = false;
                            page.current = 1;
                            const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                            if (groups.length > 0) {
                                setLoading(false);
                                setMoreGroups([...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                                page.current = page.current + 1;
                            } else {
                                loadMoreGroups.current = false;
                            }
                        }
                    } else { /* Else get all groups */
                        loadTopicBased.current = false;
                        const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                        if (groups.length > 0) {
                            setLoading(false);
                            const temp = [...groups.map(group => ({ ...group, key: crypto.randomUUID() }))];
                            setMoreGroups(temp);
                            page.current = page.current + 1;
                        } else {
                            loadMoreGroups.current = false;
                        }
                    }
                }
            } else {
                loadUserBased.current = false;
                const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page.current);
                if (topicBasedGroups.length > 0) { /* If topic based groups has groups, update `basedOnTopics` */
                    setLoading(false);
                    const groupIds = getGroupIds(topicBasedGroups);
                    tempMoreGroups.current = [...tempMoreGroups.current, ...groupIds];
                    setBasedOnTopics([...topicBasedGroups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                    page.current = page.current + 1;
                    if (topicBasedGroups.length < 12) {
                        loadTopicBased.current = false;
                        page.current = 1;
                        const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                        if (groups.length > 0) {
                            setLoading(false);
                            setMoreGroups([...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                            page.current = page.current + 1;
                        } else {
                            loadMoreGroups.current = false;
                        }
                    }
                } else { /* Else get all groups */
                    loadTopicBased.current = false;
                    const groups = await useMoreGroups(user.id, tempMoreGroups.current, page.current);
                    if (groups.length > 0) {
                        setLoading(false);
                        setMoreGroups([...groups.map(group => ({ ...group, key: crypto.randomUUID() }))]);
                        page.current = page.current + 1;
                    } else {
                        loadMoreGroups.current = false;
                    }
                }
            }
        })();


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
            {loading && <LoaderLine />}
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
                heading={!basedOnUsers && !basedOnTopics ? "Study groups" : "More study groups"} 
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