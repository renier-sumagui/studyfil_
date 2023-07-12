import { useState, useEffect, useRef } from 'react';
import { GroupForumCss } from 'stylesheets/group-forum';
import classnames from 'classnames';
import { submitReply } from './submit-reply.js';
import { useUserContext } from 'context/';
import { profanityFilter } from 'src/utils/';
import { getNameInitials } from 'src/utils';

export function ReplyForm({ commentId, setSeed, groupId }) {
    const { user } = useUserContext();
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [initials, setInitials] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        const filteredReply = await profanityFilter(inputValue);
        await submitReply(user.id, filteredReply, commentId, groupId);
        setSeed(Math.random());
    }

    useEffect(() => {
        inputRef.current.style.height = "auto";
        inputRef.current.style.height = inputRef.current.scrollHeight + "px"; 
    }, [inputValue])

    useEffect(() => {
        setInitials(getNameInitials(user.first_name + ' ' + user.last_name));
    }, [])

    return (
        <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className={GroupForumCss.commentForm}>
            <div className={GroupForumCss.avatar}>{initials}</div>
            <textarea ref={inputRef} className={classnames(GroupForumCss.commentInput, 'replyTextarea')} onChange={(e) => setInputValue(e.target.value)} placeholder="Your answer"></textarea>
            <input type="submit" disabled={inputValue ? false : true} value="Submit reply" className={GroupForumCss.submitPostBtn} />
        </form>
    )
}