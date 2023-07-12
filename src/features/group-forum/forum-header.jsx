import { useNavigate, Link } from 'react-router-dom';
import classnames from 'classnames';

import { GroupForumCss } from 'stylesheets/group-forum';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ForumIcon from '@mui/icons-material/Forum';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useGroupContext } from 'features/group-forum';

export function ForumHeader() {
    const navigate = useNavigate();
    const { group } = useGroupContext();

    return (
        <div className={classnames(GroupForumCss.forumHeader, "grayBorderBottom")}>
            <div className="flex justifySpaceBetween">
                <button className={GroupForumCss.settingsBtn} onClick={() => navigate(-1)}>
                    <ArrowBackIosNewIcon />
                </button>
                <Link to={`/groups/${group.id}/settings`} className={GroupForumCss.settingsBtn}>
                    <MoreHorizIcon />
                </Link>
            </div>
            <h1 className={GroupForumCss.forumGroupTitle}>{group.group_name}</h1>
            <div className="flex alignCenter" style={{gap: "3px"}}>
                <ForumIcon />
                <h2>{group.topic_name}</h2>
            </div>
        </div>
    )
}