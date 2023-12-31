import { useState, useEffect } from 'react';
import { StudyGroupsCss } from 'stylesheets/study-groups';
import { JoinedGroupCard } from 'features/study-groups';
import { CreateGroupBtn } from 'features/create-group';
import { useJoinedGroups } from './use-joined-groups';
import { useUserContext } from 'context/';
import classnames from 'classnames';
import { Circular } from 'features/loading';
import { StudyGroupsSkeleton } from './study-groups-skeleton.jsx';

export function JoinedStudyGroups({ heading, groups }) {
    const [seed, setSeed] = useState(1);
    const [joinedGroups, setJoinedGroups] = useState();
    const { user } = useUserContext();
    const [loading, setLoading] = useState(true);
    const [queue, setQueue] = useState(null)
    
    function reload() {
        setSeed(Math.random());
    }

    useEffect(() => {
        (async function() {
            setLoading(true);
            let response = await useJoinedGroups(user.id);
            setLoading(false);
            if (response.data.hasGroups) {
                const groups = response.data.groups.map((group) => {
                    return <JoinedGroupCard 
                                key={group.id} 
                                groupId={group.id} 
                                groupName={group.group_name} 
                                topic={group.topic_name} 
                                owner={group.username} 
                                memberCount={group.member_count}
                                memberLimit={group.member_limit}
                                isAcademic={group.is_academic}
                                rating={group.rating}
                            />
                });
                setJoinedGroups(groups);
            } else {
                setQueue(<p>You have not joined a group.</p>)
            }
        })();
    }, [seed])

    return (
        <div className={StudyGroupsCss.studyGroups}>
            {loading ? <StudyGroupsSkeleton headerWidth={140} /> :
            <>
                <h2>{heading}</h2>
                <div className={classnames(StudyGroupsCss.groupsContainer, "flex wrap")}>
                    {joinedGroups ? joinedGroups.map((group) => group) : queue}
                </div>
            </>}
            <CreateGroupBtn reload={ reload } />
        </div>
    )
}