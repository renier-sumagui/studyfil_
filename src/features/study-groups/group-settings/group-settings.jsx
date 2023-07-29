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
import TopicIcon from '@mui/icons-material/Topic';
import StarRateOutlined from '@mui/icons-material/StarRateOutlined';
import StarRate from '@mui/icons-material/StarRate';
import { AbsoluteCircular } from 'features/loading';

function Rating({ groupId, userId }) {
    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [fifth, setFifth] = useState(false);
    const [rateLoading, setRateLoading] = useState(false);
    const setsObj = {
        '1': (solid) => solid ? setFirst(true) : setFirst(false), 
        '2': (solid) => solid ? setSecond(true) : setSecond(false), 
        '3': (solid) => solid ? setThird(true) : setThird(false), 
        '4': (solid) => solid ? setFourth(true) : setFourth(false), 
        '5': (solid) => solid ? setFifth(true) : setFifth(false),
    }

    function changeStar(value) {
        for (let index = 1; index <= 5; index++) {
            if (index <= value) {
                setsObj[`${index}`](true);
            } else {
                setsObj[`${index}`](false);
            }
        }
    }

    function handleClick(value) {
        (async function () {
            setRateLoading(true);
            // pass rate to api 
            try {
                await Axios.post('https://studyfil-api.onrender.com/groups/rate', { rating: value, groupId, userId }, { withCredentials: true });
            } catch (error) {
                throw new Error(error);
            }
            setRateLoading(false);
        })();
        changeStar(value);
    }

    useEffect(() => {
        (async function () {
            setRateLoading(true);
            const response = await Axios.get(`https://studyfil-api.onrender.com/groups/ratings?groupId=${groupId}&userId=${userId}`);
            const { hasRating } = response.data;
            if (hasRating) {
                changeStar(response.data.rating);
            }
            setRateLoading(false);
        })();
    }, [])

    return (
        <div className={GroupForumCss.ratingContainer}>
            {rateLoading &&
            
                <AbsoluteCircular />
            }
            <p><strong>Rate Group</strong></p>
            <button  onClick={() => handleClick(1)}>
                {first ? <StarRate color="primary" sx={{ fontSize: 40 }} /> : <StarRateOutlined color="primary" sx={{ fontSize: 40 }}  />}
            </button>
            <button  onClick={() => handleClick(2)}>
                {second ? <StarRate color="primary" sx={{ fontSize: 40 }} /> : <StarRateOutlined color="primary" sx={{ fontSize: 40 }}  />}
            </button>
            <button onClick={() => handleClick(3)}>
                {third ? <StarRate color="primary" sx={{ fontSize: 40 }} /> : <StarRateOutlined color="primary" sx={{ fontSize: 40 }}  />}
            </button>
            <button  onClick={() => handleClick(4)}>
                {fourth ? <StarRate color="primary" sx={{ fontSize: 40 }} /> : <StarRateOutlined color="primary" sx={{ fontSize: 40 }}  />}
            </button>
            <button  onClick={() => handleClick(5)}>
                {fifth ? <StarRate color="primary" sx={{ fontSize: 40 }} /> : <StarRateOutlined color="primary" sx={{ fontSize: 40 }}  />}
            </button>
        </div>
    )
}

export function GroupSettings() {
    const navigate = useNavigate();
    const { groupId } = useParams();
    const [loading, setLoading] = useState(false);
    const [group, setGroup] = useState();
    const { user } = useUserContext();

    useEffect(() => {
        (async function() {
            let response = await Axios.get(`https://studyfil-api.onrender.com/groups/get/${groupId}`);
            setGroup({...response.data.group, created_at: getTimePassed(response.data.group.created_at)});
        })();
    }, []);

    return (
        <>
            {group ? (
                <>
                    <div className="flex justifySpaceBetween alignFlexStart gap5">
                        <div className="flex alignCenter" style={{ padding: '0 0 10px 0', maxWidth: '85%' }}>
                            <button className={GroupForumCss.settingsBtn} onClick={() => navigate(-1)}><ArrowBackIosNewIcon /></button>
                            <h1>{group.group_name}</h1>
                        </div>
                        {group.admin_id == user.id ? <DeleteGroupButton groupId={groupId} /> : <LeaveGroupButton userId={user.id} groupId={groupId} />}
                    </div>
                    <div className={classnames(GroupForumCss.groupInformation)}>
                        <h2>Group Information</h2>
                        <p><span><PersonIcon /> Group Owner:</span> <span>{group.admin_username}</span></p>
                        <p><span><ForumIcon /> Topic Discussed:</span> <span>{group.topic_name}</span></p>
                        <p><span><TopicIcon /> Type:</span> <span>{group.is_academic ? 'Academic' : 'Non-academic'}</span></p>
                        <p><span><PeopleIcon /> Members:</span> <span>{group.member_count}/{group.member_limit}</span></p>
                        <p><span><CalendarMonthIcon /></span> Created <span>{group.created_at}</span></p>
                    </div>
                    <Members adminId={group.admin_id} groupId={group.id}/>
                    <Rating groupId={groupId} userId={user.id} />
                </>
            ) : null }
            {loading && <Circular />}
        </>
    )
}