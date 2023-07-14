import { useState } from 'react';
import { GroupCardCss } from 'stylesheets/study-groups';
import classnames from 'classnames';
import { joinGroup } from './join-group.js';
import { useUserContext } from 'context/';
import { AbsoluteCircular } from 'features/loading';
import GroupIcon from '@mui/icons-material/Group';

export function GroupCard({ groupId, groupName, topic, owner, memberLimit, memberCount, setSeed, isAcademic }) {
    const { user } = useUserContext();
    const [loading, setLoading] = useState(false);

    async function handleJoin() {
        setLoading(true);
        const response = await joinGroup(user.id, groupId);
        if (response.success) {
            setSeed(Math.random());
        }
        setLoading(false);
    }

    return (
        <div className={GroupCardCss.groupCard}>
            {loading && <AbsoluteCircular />}
            <h3>{groupName}</h3>
            <h4>Topic: {topic}</h4>
            <p className="fontSizeSmall">Type: <span className={classnames(GroupCardCss.ellipsis, 'verticalAlignBaseline fontSizeSmall')}>{isAcademic ? 'Academic' : 'Non-academic'}</span></p>
            <p className="fontSizeSmall">Owner: <span className={classnames(GroupCardCss.ellipsis, 'verticalAlignBaseline fontSizeSmall')}>{owner}</span></p>
            <p className="fontSizeSmall"><GroupIcon fontSize='small'  sx={{ verticalAlign: 'bottom' }} /> {memberCount}/{memberLimit}</p>
            <button className={GroupCardCss.joinBtn} onClick={handleJoin}>Join Group</button>
        </div>
    )
}