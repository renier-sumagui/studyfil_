import { useParams } from 'react-router-dom';
import { GroupForumCss } from 'stylesheets/group-forum';
import { ForumHeader, Discussion } from 'features/group-forum';
import { useGroupContext } from './group-context.jsx';
import { Circular } from 'features/loading';

export function GroupForum() {
    const { group } = useGroupContext();

    if (group) {
        return (
            <>
                <ForumHeader />
                <Discussion />
            </>
        )
    } else {
        return <Circular />;
    }
}