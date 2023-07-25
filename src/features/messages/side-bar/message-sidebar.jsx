import { useState, useEffect } from 'react';
import { MessagesCss } from 'stylesheets/messages';
import { GroupLink } from 'features/messages';
import { useMessageContext } from 'features/messages';
import { useJoinedGroups } from 'features/study-groups';
import { useUserContext } from 'context/';
import { AbsoluteCircular } from 'features/loading';

export function MessageSidebar() {
    const { user } = useUserContext();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function() {
            const response = await useJoinedGroups(user.id);
            setLoading(false);
            if (response.data.hasGroups) {
                setGroups(response.data.groups.map((group) => {
                    return <GroupLink key={group.id} id={group.id} groupName={group.group_name} />
                }));
            }
        })();
    }, [])

    return (
        <div className={MessagesCss.messageSidebar}>
            <h2 className={MessagesCss.messageSidebarHeading}>Messages</h2>
            {loading && <AbsoluteCircular />}
            {groups ? (
                <ul>
                    {groups.map((group) => group)}
                </ul>
                ) : <p>No Group Message</p>
            }
        </div>
    )
}