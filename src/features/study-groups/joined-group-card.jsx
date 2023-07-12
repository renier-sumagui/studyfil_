import { GroupCardCss } from 'stylesheets/study-groups';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

export function JoinedGroupCard({ groupId, groupName, topic, owner, memberCount, memberLimit }) {

    return (
        <div className={GroupCardCss.groupCard}>
            <h3>{groupName}</h3>
            <h4>Topic: {topic}</h4>
            <p className="fontSizeSmall">Group Owner: <span className={classnames(GroupCardCss.ellipsis, 'verticalAlignBaseline fontSizeSmall')}>{owner}</span></p>
            <p className="fontSizeSmall"><i className="fa-solid fa-user-group"></i> {memberCount}/{memberLimit}</p>
            <button className={GroupCardCss.viewBtn}><Link to={`/groups/${groupId}`}>View Group</Link></button>
        </div>
    )
}