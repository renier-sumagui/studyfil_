import { useState, useEffect } from 'react';
import { GroupForumCss } from 'stylesheets/group-forum';
import StraightIcon from '@mui/icons-material/Straight';
import classnames from 'classnames';
import { submitVote } from './submit-vote.js';
import { useUserContext } from 'context/';

export function UpvoteDownvote({ id, isComment,  children, upvotes, downvotes, setSeed }) {
    const { user } = useUserContext();
    const [upvote, setUpvote] = useState();
    const [downvote, setDownvote] = useState();

    async function handleVote(voteType) { 
        await submitVote(id, voteType, isComment, user.id);
        setSeed(Math.random());
    }

    return (
        <div className={classnames(GroupForumCss.upvoteDownvote, 'flex')}>
            <div className={classnames(GroupForumCss.arrows, 'flex')}>
                <button onClick={() => handleVote(1)}><StraightIcon />
                    {upvotes} {upvotes > 1 ? 'upvotes' : 'upvote'}
                </button>
                <button onClick={() => handleVote(0)}><StraightIcon sx={{transform: 'rotate(180deg)'}} />
                    {downvotes} {downvotes > 1 ? 'downvotes' : 'downvote'}
                </button>
            </div>
            { children }
        </div>
    )
}