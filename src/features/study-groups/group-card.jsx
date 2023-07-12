import { GroupCardCss } from 'stylesheets/study-groups';
import classnames from 'classnames';
import { joinGroup } from './join-group.js';
import { useUserContext } from 'context/';

export function GroupCard({ groupId, groupName, topic, owner, memberLimit, memberCount, setSeed, isAcademic }) {
    const { user } = useUserContext();

    async function handleJoin() {
        const response = await joinGroup(user.id, groupId);
        if (response.success) {
            setSeed(Math.random());
        }
    }

    return (
        <div className={GroupCardCss.groupCard}>
            <h3>{groupName}</h3>
            <h4>Topic: {topic}</h4>
            <p className="fontSizeSmall">Group Owner: <span className={classnames(GroupCardCss.ellipsis, 'verticalAlignBaseline fontSizeSmall')}>{owner}</span></p>
            <p className="fontSizeSmall"><i className="fa-solid fa-user-group"></i>{memberCount}/{memberLimit}</p>
            <button className={GroupCardCss.joinBtn} onClick={handleJoin}>Join Group</button>
        </div>
    )
}