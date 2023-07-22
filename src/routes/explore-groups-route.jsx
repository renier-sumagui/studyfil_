import { useEffect, useState, createContext } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { StudyGroups } from 'features/study-groups';
import { useUserContext } from 'context/';
import { useDiscoverGroups, useGroupsBasedOnTopics, useMoreGroups } from 'features/study-groups';
import { AbsoluteCircular } from 'features/loading';

function getGroupIds(groups) {
    const groupIds = groups.map((group) => group.id);
    return groupIds;
}

function ExploreGroupsRoute() {
    const { user } = useUserContext();
    const [seed, setSeed] = useState(1);

    const [basedOnUsers, setBasedOnUsers] = useState();
    const [basedOnTopics, setBasedOnTopics] = useState();
    const [moreGroups, setMoreGroups] = useState();

    const [loadUserBased, setLoadUserBased] = useState(true);
    const [loadTopicBased, setLoadTopicBased] = useState(true);
    const [loadMoreGroups, setLoadMoreGroups] = useState(true);

    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [groupIds, setGroupIds] = useState([]);


    async function handleScroll() {
        const main = document.getElementById("main-section");
        if (main.scrollTop + main.clientHeight !== main.scrollHeight || loading) {
            return;
        } else {
            setLoading(true);
            /* If `loadUserBased` is true, get recommendations */
            if (loadUserBased) {
                const userBasedGroups = await useDiscoverGroups(user.id, page);
                /* If `userBasedGroups` has items, update `basedOnUsers`, else set `loadUserBased` to false */
                if (userBasedGroups.length > 0) {   
                    const groupIds = getGroupIds(userBasedGroups);
                    setGroupIds(prev => [...prev, ...groupIds]);
                    if (userBasedGroups.length > 0 && userBasedGroups[userBasedGroups.length - 1].id !== basedOnUsers[basedOnUsers.length - 1] || loading) {
                        setBasedOnUsers(prev => [...prev, ...userBasedGroups]);
                        setPage(prev => prev + 1);
                    } else {
                        setLoadUserBased(false);
                        setPage(1);
                    }
                } else {
                    setLoadUserBased(false);
                    setPage(1);
                    const topicBasedGroups = await useGroupsBasedOnTopics(user.id, 1);
                    if (topicBasedGroups.length > 0) { /* If topic based groups has groups, update `basedOnTopics` */
                        const groupIds = getGroupIds(topicBasedGroups);
                        setGroupIds(prev => [...prev, ...groupIds]);
                        setBasedOnTopics(topicBasedGroups);
                        setPage(prev => prev + 1);
                    } else { /* Else get all groups */
                        setLoadTopicBased(false);
                        const groups = await useMoreGroups(user.id, groupIds, 1);
                        if (groups.length > 0) {
                            const groupIds = getGroupIds(moreGroups);
                            setGroupIds(prev => [...prev, ...groupIds]);
                            setMoreGroups(groups);
                            setPage(prev => prev + 1);
                        } else {
                            setLoadMoreGroups(false);
                        }
                    }
                }
            } else if (loadTopicBased) {
                const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page);
                if (topicBasedGroups.length > 0) {

                    if (topicBasedGroups.length > 0 && topicBasedGroups[topicBasedGroups.length - 1].id !== basedOnTopics[basedOnTopics.length - 1].id || loading) {
                        const groupIds = getGroupIds(topicBasedGroups);
                        setGroupIds(prev => [...prev, ...groupIds]);
                        setBasedOnTopics(prev => [...prev, ...topicBasedGroups]);
                    } else {
                        setLoadTopicBased(false);
                        setPage(1);
                        /* Has topics of interest but the latest group is already recommended, load initial more groups */
                        const groups = await useMoreGroups(user.id, groupIds, 1);
                        if (groups.length > 0) {
                            setPage(prev => prev + 1);
                            setMoreGroups([...groups]);
                        } else {
                            setLoadMoreGroups(false);
                            setPage(1);
                        }
                    }
                } else {
                    setLoadTopicBased(false);
                    setPage(1);
                    const groups = await useMoreGroups(user.id, groupIds, 1);
                    if (groups.length > 0) {
                        setPage(prev => prev + 1);
                        setMoreGroups([...groups]);
                    } else {
                        setLoadMoreGroups(false);
                        setPage(1);
                    }
                }
            } else if (loadMoreGroups) {
                
                const groups = await useMoreGroups(user.id, groupIds, page);
                if (groups.length > 0) {
                    if (groups.length > 0 && groups[groups.length - 1].id !== moreGroups[moreGroups.length - 1].id || loading) {
                        setPage(prev => prev + 1);
                        setMoreGroups(prev => [...prev, ...groups]);
                    } else {
                        setLoadMoreGroups(false);
                        setPage(1);
                    }
                } else {
                    setLoadMoreGroups(false);
                    setPage(1);
                }
            }
            setLoading(false);
        }
    };


    useEffect(() => {
        const main = document.getElementById("main-section");
        (async function() {
            setLoading(true);
            const userBasedGroups = await useDiscoverGroups(user.id, page);
            /* If `userBasedGroups` has items, update `basedOnUsers`, else set `loadUserBased` to false */
            if (userBasedGroups.length > 0) {   
                const groupIds = getGroupIds(userBasedGroups);
                setGroupIds(prev => [...prev, ...groupIds]);
                setBasedOnUsers(userBasedGroups);
                setPage(prev => prev + 1);
                if (userBasedGroups.length < 12) {
                    setLoadUserBased(false);
                    setPage(1);
                    const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page);
                    if (topicBasedGroups.length > 0) { /* If topic based groups has groups, update `basedOnTopics` */
                        const groupIds = getGroupIds(topicBasedGroups);
                        setGroupIds(prev => [...prev, ...groupIds]);
                        setBasedOnTopics(topicBasedGroups);
                        setPage(prev => prev + 1);
                        if (topicBasedGroups.length < 12) {
                            setLoadTopicBased(false);
                            setPage(1);
                            const groups = await useMoreGroups(user.id, groupIds, page);
                            if (groups.length > 0) {
                                const groupIds = getGroupIds(groups);
                                setMoreGroups(groups);
                                setPage(prev => prev + 1);
                            } else {
                                setLoadMoreGroups(false);
                            }
                        }
                    } else { /* Else get all groups */
                        setLoadTopicBased(false);
                        const groups = await useMoreGroups(user.id, groupIds, page);
                        if (groups.length > 0) {
                            setMoreGroups(groups);
                            setPage(prev => prev + 1);
                        } else {
                            setLoadMoreGroups(false);
                        }
                    }
                }
            } else {
                setLoadUserBased(false);
                const topicBasedGroups = await useGroupsBasedOnTopics(user.id, page);
                console.log(topicBasedGroups);
                if (topicBasedGroups.length > 0) { /* If topic based groups has groups, update `basedOnTopics` */
                    const groupIds = getGroupIds(topicBasedGroups);
                    setGroupIds(prev => [...prev, ...groupIds]);
                    setBasedOnTopics(topicBasedGroups);
                    setPage(prev => prev + 1);
                    if (topicBasedGroups.length < 12) {
                        setLoadTopicBased(false);
                        setPage(1);
                        const groups = await useMoreGroups(user.id, groupIds, page);
                        if (groups.length > 0) {
                            setMoreGroups(groups);
                            setPage(prev => prev + 1);
                        } else {
                            setLoadMoreGroups(false);
                        }
                    }
                } else { /* Else get all groups */
                    setLoadTopicBased(false);
                    const groups = await useMoreGroups(user.id, groupIds, page);
                    if (groups.length > 0) {
                        setMoreGroups(groups);
                        setPage(prev => prev + 1);
                    } else {
                        setLoadMoreGroups(false);
                    }
                }
            }
            setLoading(false);
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
            {basedOnUsers && <StudyGroups heading="Study groups you might like" groups={basedOnUsers} seed={seed} setSeed={setSeed} />}
            {basedOnTopics && <StudyGroups heading="Study groups based on topics you like" groups={basedOnTopics} seed={seed} setSeed={setSeed} />}
            {moreGroups && <StudyGroups heading={!basedOnUsers && !basedOnTopics ? "Study groups" : "More study groups"} groups={moreGroups} seed={seed} setSeed={setSeed} />}
            {loading ? <AbsoluteCircular /> : !basedOnUsers && !basedOnTopics && !moreGroups ? <h3>No groups yet</h3> : null}
        </>
    )
}

export default ExploreGroupsRoute;