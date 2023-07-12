import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classnames from 'classnames';
import Axios from 'axios';
import { GroupForumCss } from 'stylesheets/group-forum';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import { Members } from 'features/study-groups';
import { Circular } from 'features/loading';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getTimePassed } from 'src/utils';
import { LeaveGroupButton } from './leave-group-button.jsx';
import { DeleteGroupButton } from './delete-group-button.jsx';
import { useUserContext } from 'context/';

export function GroupSettings() {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState();
    const { user } = useUserContext();

    useEffect(() => {
        (async function() {
            let response = await Axios.get(`https://studyfil-api.onrender.com/groups/get/${groupId}`);
            console.log(response.data.group);
            setGroup({...response.data.group, created_at: getTimePassed(response.data.group.created_at)});
        })();
    }, []);

    return (
        <>
            {group ? (
                <>
                    <div className="flex justifySpaceBetween alignFlexStart gap5">
                        <div className="flex alignCenter" style={{ padding: '0 0 10px 0'}}>
                            <button className={GroupForumCss.settingsBtn} onClick={() => navigate(-1)}><ArrowBackIosNewIcon /></button>
                            <h1>{group.group_name}</h1>
                        </div>
                        {group.admin_id == user.id ? <DeleteGroupButton groupId={groupId} /> : <LeaveGroupButton userId={user.id} groupId={groupId} />}
                    </div>
                    <div className={classnames(GroupForumCss.groupInformation)}>
                        <h2>Group Information</h2>
                        <p><span><PersonIcon /> Group Owner:</span> <span>{group.admin_username}</span></p>
                        <p><span><ForumIcon /> Topic Discussed:</span> <span>{group.topic_name}</span></p>
                        <p><span><PeopleIcon /> Number of Members:</span> <span>{group.member_count}/{group.member_limit}</span></p>
                        <p><span><CalendarMonthIcon /></span> Created <span>{group.created_at}</span></p>
                    </div>
                    <Members adminId={group.admin_id} groupId={group.id}/>
                </>
            ) : null }
            {loading && <Circular />}
        </>
    )
}