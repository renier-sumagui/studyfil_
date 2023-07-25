import { useState, useEffect } from 'react';
import { FeedbackCss } from 'stylesheets/feedback';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { GroupForumCss } from 'stylesheets/group-forum';
import classnames from 'classnames';
import { useFeedbacks } from './use-feedbacks.js';
import { getNameInitials } from 'src/utils/';
import Axios from 'axios';
import { useUserContext } from 'src/context/index.js';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function FeedbackOptions({ feedbackId, setSeed }) {
    const [modal, setModal] = useState(false);

    function handleOptionClick(e) {
        e.stopPropagation();
        e.preventDefault();
        setModal(prev => !prev);
    }

    async function handleDelete() {
        await Axios.delete(`https://studyfil-api.onrender.com/feedbacks/delete/${feedbackId}`);
        setSeed(Math.random());
    }

    return (
        <div className={GroupForumCss.postOptionContainer}>
            <button 
                onClick={handleOptionClick}
                className={GroupForumCss.postOptionBtn}
            >
                <MoreHorizIcon />
            </button>
            {modal &&
            <div className={FeedbackCss.feedbackDialog}>
                <button onClick={handleDelete}>
                    Delete Feedback
                </button>
            </div>}
        </div>
    )
}


function FeedbackContent({ feedbackId, userId, username, fullName, initials, content, country, createdAt, setSeed }) {
    const { user } = useUserContext();
    const [options, setOptions] = useState(false);

    function handleMouseOver() {
        if (user.id === userId) {
            setOptions(true);
        }
    }

    function handleMouseOut() {
        if (options) {
            setOptions(false);
        }
    }

    return (
        <div className={GroupForumCss.comment} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={classnames(GroupForumCss.commentHeader, 'flex alignCenter')}>
                <div className={GroupForumCss.avatar}>{initials}</div>
                <div className={GroupForumCss.postUserInfo}>
                    <p>{username}<span style={{ marginLeft: '5px' }} className={GroupForumCss.timePosted}>{createdAt}</span></p>
                    <p>{country} | {fullName}</p>
                </div>
            </div>
            <div style={{ marginLeft: '50px' }}>
                <p>{content}</p>
            </div>
            {options && <FeedbackOptions feedbackId={feedbackId} setSeed={setSeed} />}
        </div>
    )
}

function FeedbackForm({ setSeed }) {
    const [textarea, setTextarea] = useState('');
    const { user } = useUserContext();

    async function handleSubmit(e) {
        e.preventDefault();
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        await Axios.post('https://studyfil-api.onrender.com/feedbacks/add', { userId: user.id, content: textarea, timezone }, { withCredentials: true });
        setSeed(Math.random());
        setTextarea('');
    }

    return (
        <form className={FeedbackCss.feedbackForm} onSubmit={handleSubmit}>
            <textarea placeholder="Type a message" value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
            <input type="submit" value="Submit" />
        </form>
    )
}

export function Feedback() {
    const [feedbacksArray, setFeedbacksArray] = useState();
    const [seed, setSeed] = useState(1);

    useEffect(() => {
        setFeedbacksArray();
        (async function() {
            const feedbacks = await useFeedbacks();
            if (feedbacks.length > 0) {
                setFeedbacksArray(feedbacks.map((feedback) => {
                    return (
                        <FeedbackContent 
                            feedbackId={feedback.id}
                            userId={feedback.user_id}
                            username={feedback.username}
                            fullName={feedback.full_name}
                            initials={getNameInitials(feedback.full_name)}
                            content={feedback.content}
                            country={feedback.country}
                            createdAt={feedback.created_at}
                            setSeed={setSeed}
                        />
                    )
                }))
            }
        })()
    }, [seed])

    return (
        <>
            <h1 className={FeedbackCss.feedbackHeader}><FeedbackIcon sx={{ fontSize: '1.9rem' }} /> Feedback</h1>
            <h3>Share your comments/suggestions/opinions to help us improve StudyFil</h3>
            <FeedbackForm setSeed={setSeed} />
            {feedbacksArray && feedbacksArray}
        </>
    )
}