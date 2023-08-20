import { useState, useEffect } from 'react';
import { HomeHeaderCss } from "src/assets/stylesheets/home";
import { Link } from "react-router-dom";
import { getTimePassed } from 'src/utils';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export function NotificationContent({ notificationId, username, type, seen, referenceId, content, groupId, postId, groupName, datetime }) {
    const [link, setLink] = useState('');
    const navigate = useNavigate();
    const [isSeen, setIsSeen] = useState(seen);

    const style = {
        a: { fontWeight: !seen ? '500' : '400', color: !seen ? 'black' : 'gray' },
        time: { fontWeight: !seen ? 'bolder' : '400', color: !seen ? '#000080' : 'gray' },
    };

    useEffect(() => {
        switch (type) {
            case 'comment':
                setLink(`/groups/${groupId}/post/${referenceId}`);
                break;
            case 'reply':
                setLink(`/groups/${groupId}/post/${postId}`);
                break;
            case 'post':
                setLink(`/groups/${referenceId}`);
                break;
            case 'message':
                setLink(`/messages/${referenceId}`);
                break;
            case 'left group':
                setLink(`/groups/${groupId}/settings`)
            case 'joined group':
                setLink(`/groups/${groupId}/settings`)
            default:
                break;
        }
    }, []);

    async function handleMouseUp(e) {
        e.preventDefault();
        await Axios.put('https://studyfil-api.onrender.com/user/notification/seen', { notificationId }, { withCredentials: true });
        navigate(link);
    }

    useEffect(() => {
        console.log('IS SEEN', isSeen);
    }, [isSeen]);

    return (
        <Link to={link} onClick={handleMouseUp} className={HomeHeaderCss.notificationContentContainer}>
            <div>
                <p 
                    className={HomeHeaderCss.notificationContent} 
                    style={{ 
                        color: seen ? '#919191' : '#1f1f1f' 
                    }}
                >
                    <strong>{username}</strong> {content} {groupName && <strong>{groupName}</strong>}
                </p>
                <p 
                    className={HomeHeaderCss.notificationTime} 
                    style={{ 
                        color: seen ? '#919191' : '#1f1f1f', 
                        fontWeight: seen ? '400' : 'bolder' 
                    }}
                >
                    {getTimePassed(datetime)}
                </p>
            </div>
            {!seen && <div className={HomeHeaderCss.dot}></div>}
        </Link>
    )
}