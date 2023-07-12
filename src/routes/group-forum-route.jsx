import { GroupForum } from 'features/group-forum';
import { useParams } from 'react-router-dom';
import { GroupContextProvider } from 'features/group-forum';

export function GroupForumRoute() {
    const { groupId } = useParams();

    return (
        <GroupContextProvider groupId={groupId}>
            <GroupForum />
        </GroupContextProvider>
    );
}

export default GroupForumRoute;