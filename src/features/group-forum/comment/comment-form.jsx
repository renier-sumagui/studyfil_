import { GroupForumCss } from 'stylesheets/group-forum';
import { useEffect, useState, useRef } from 'react';
import { submitComment } from './submit-comment.js';
import { useUserContext } from 'context/';
import { profanityFilter,getNameInitials } from 'src/utils/';
import { AbsoluteCircular } from 'features/loading';

export function CommentForm({ postId, setSeed, groupId }) {
    const commentRef = useRef(null);
    const [comment, setComment] = useState('');
    const { user } = useUserContext();
    const [initials, setInitials] = useState();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const filteredComment = await profanityFilter(comment);
        setLoading(true);
        await submitComment(user.id, postId, filteredComment, groupId);
        setLoading(false);
        setComment('');
        setSeed(Math.random());
    }

    useEffect(() => {
        const textarea = commentRef.current;
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px"; 
    }, [comment])

    useEffect(() => {
        setInitials(getNameInitials(user.first_name + ' ' + user.last_name));
    }, [])

    return (
        <form className={GroupForumCss.commentForm} onSubmit={handleSubmit} style={{ position: 'relative' }}>
            {loading && <AbsoluteCircular />}
            <div className={GroupForumCss.avatar}>{initials}</div>
            <textarea 
                ref={commentRef} 
                value={comment} 
                id="commentTextarea" 
                className={GroupForumCss.commentInput} 
                placeholder="Your answer" 
                onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <input type="submit" disabled={comment ? false : true } value="Submit answer" className={GroupForumCss.submitPostBtn} />
        </form>
    )
}