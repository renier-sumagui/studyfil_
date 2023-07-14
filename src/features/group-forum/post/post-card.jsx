import classnames from 'classnames'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GroupForumCss } from 'stylesheets/group-forum';
import { useGroupContext } from 'features/group-forum';
import { useUserContext } from 'context/';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { submitResolve } from './submit-resolve';
import { getNameInitials } from 'src/utils';

function PostOptionButton({ isResolved, postId, setSeed }) {
    const [modal, setModal] = useState(false);

    function handleOptionClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setModal(prev => !prev);
    }

    async function handleMark(e) {
        e.preventDefault();
        e.stopPropagation();
        await submitResolve(isResolved, postId);
        setModal(prev => !prev);
        setSeed(Math.random());
    }

    async function handleDelete(e) {
        e.preventDefault();
        e.stopPropagation();
        await Axios.delete(`https://studyfil-api.onrender.com/posts/delete/${postId}`, { withCredentials: true });
        setSeed(Math.random());
    }

    return (
        <div className={GroupForumCss.postOptionContainer}>
            <button 
                className={
                    classnames(
                        'flex alignCenter', 
                        (isResolved ? GroupForumCss.resolvedPostOptionBtn : GroupForumCss.postOptionBtn)
                    )
                }
                onClick={handleOptionClick}
            >
                <MoreHorizIcon />
            </button>
            {modal &&
            <div className={GroupForumCss.postOptionDialog}>
                <button onClick={handleMark} >
                    Mark as {isResolved ? 'unresolved' : 'resolved'}
                </button>
                <button onClick={handleDelete}>
                    Delete post
                </button>
            </div>
            }
        </div>
    )
}

export function PostCard({ postId, username, fullName, country, content, answers, timePosted, isResolved, setSeed }) {
    const { group } = useGroupContext();
    const { user } = useUserContext();
    const [showOptions, setShowOptions] = useState(false);
    const [initials, setInitials] = useState();

    function handleMouseOver() {
        if (username === user.username) setShowOptions(true);
    }
    function handleMouseLeave() {
        if (username === user.username) setShowOptions(false);
    }

    useEffect(() => {
        setInitials(getNameInitials(fullName));
    }, [])

    return (
        <Link 
            to={`/groups/${group.id}/post/${postId}`} 
            className={
                classnames(
                    GroupForumCss.postCard, 
                    GroupForumCss.wrapper, 
                    (isResolved ? GroupForumCss.resolvedCard: null)
                )
            }
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <div className={GroupForumCss.postHeader}>
                <div className="flex justifySpaceBetween">
                    <div className="flex alignCenter">
                        <div src="/img/panda.jpg" className={classnames(GroupForumCss.avatar)}>{initials}</div>
                        <div className={GroupForumCss.postUserInfo}>
                            <p>{username} <span className={GroupForumCss.timePosted}>{timePosted}</span></p>
                            <p>{country} | {fullName}</p>
                        </div>
                    </div>
                    {isResolved ? <p className={GroupForumCss.resolved}>Resolved</p> : null}
                </div>
            </div>
            <h3 className={GroupForumCss.question}>{content}</h3>
            <p>{answers > 0 && answers} {answers > 1 ? 'answers' : answers < 1 ? 'No answers' : 'answer'}</p>
            {showOptions ? <PostOptionButton isResolved={isResolved} postId={postId} setSeed={setSeed} /> : null}
        </Link>
    )
}