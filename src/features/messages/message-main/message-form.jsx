import Axios from 'axios';
import { MessagesCss } from "stylesheets/messages";
import { useState } from 'react';
import { useMessageContext } from "./message-main";
import { useUserContext } from 'src/context';
import { socket } from './socket.js';
import { profanityFilter, getNameInitials, getCurrentDatetime } from 'src/utils/';
import SendIcon from '@mui/icons-material/Send';
import { useWordsContext } from 'context/';

export function MessageForm() {
    const { group } = useMessageContext();
    const { user } = useUserContext();
    const [message, setMessage] = useState('');
    const { words } = useWordsContext();

    async function handleSubmit(e) {
        e.preventDefault();
        const filteredMessage = await profanityFilter(message, words);
        const initials = getNameInitials(user.first_name + ' ' + user.last_name);
        await Axios.post('https://studyfil-api.onrender.com/messages/send', { userId: user.id, groupId: group.id, content: filteredMessage }, { withCredentials: true });
        Axios.post('https://studyfil-api.onrender.com/user/notification/add', { 
            userWhoNotified: user.id,
            referenceId: group.id,
            eventId: 1,
            groupId: group.id,
            datetime: getCurrentDatetime()
        }, { withCredentials: true });
        socket.emit('send_message', { userName: user.username, userID: user.id, groupID: group.id, message: filteredMessage, initials: initials });
        setMessage('');
    }

    return (
        <form className={MessagesCss.messageForm} onSubmit={handleSubmit}>
            <input type="text" placeholder="Message" className={MessagesCss.messageInput}  value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" disabled={message ? false : true}><SendIcon /></button>
        </form>
    )
}