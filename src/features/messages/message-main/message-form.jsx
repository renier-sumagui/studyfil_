import Axios from 'axios';
import { MessagesCss } from "stylesheets/messages";
import { useState } from 'react';
import { useMessageContext } from "./message-main";
import { useUserContext } from 'src/context';
import { socket } from './socket.js';
import { profanityFilter } from 'src/utils/';
import { getNameInitials } from 'src/utils/';

export function MessageForm() {
    const { group } = useMessageContext();
    const { user } = useUserContext();
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const filteredMessage = await profanityFilter(message);
        const initials = getNameInitials(user.first_name + ' ' + user.last_name);
        Axios.post('https://studyfil-api.onrender.com/messages/send', { userId: user.id, groupId: group.id, content: filteredMessage }, { withCredentials: true });
        socket.emit('send_message', { userName: user.username, userID: user.id, groupID: group.id, message: filteredMessage, initials: initials });
        setMessage('');
    }

    return (
        <form className={MessagesCss.messageForm} onSubmit={handleSubmit}>
            <input type="text" placeholder="Message" className={MessagesCss.messageInput}  value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" disabled={message ? false : true}><i className="fa-solid fa-paper-plane"></i></button>
        </form>
    )
}