import { useState, useEffect } from 'react';
import { GroupForumCss } from 'stylesheets/group-forum';
import classnames from 'classnames';
import { UpvoteDownvote } from 'features/group-forum';
import { ReplyForm } from 'features/group-forum';
import { Reply } from 'features/group-forum';
import { useReplies } from './use-replies.js';
import { getNameInitials } from 'src/utils/';
import { useParams } from 'react-router-dom';

export function Comment({ commentId, username, fullName, country, content, timePosted, upvotes, downvotes, postSeed, groupId }) {
    const [replyForm, setReplyForm] = useState(false);
    const [seed, setSeed] = useState(1);
    const [replies, setReplies] = useState();
    const initials = getNameInitials(fullName);
    const { postId } = useParams();

    const replyBtn = (
        <button 
            onClick={(e) => { 
                e.stopPropagation();
                setReplyForm(true)}
            }
        >
            Reply
        </button>
    )

    useEffect(() => {
        (async function() {
            const response = await useReplies(commentId);
            if (response.hasReplies) {
                setReplies(response.replies.map((reply) => {
                    return <Reply 
                                key={reply.id}
                                replyId={reply.id}
                                username={reply.username}
                                fullName={reply.fullName}
                                country={reply.country}
                                content={reply.content}
                                timePosted={reply.timePosted}
                                upvotes={reply.upvotes}
                                downvotes={reply.downvotes}
                                setSeed={setSeed}
                            />
                }));
            } else {

            }
        })();
    }, [seed])

    return (
        <div className={GroupForumCss.comment}  onClick={() => setReplyForm(false)}>
            <div className={classnames(GroupForumCss.commentHeader, 'flex alignCenter')}>
                <div className={GroupForumCss.avatar}>{initials}</div>
                <div className={GroupForumCss.postUserInfo}>
                    <p>{username}<span style={{ marginLeft: '5px' }} className={GroupForumCss.timePosted}>{timePosted}</span></p>
                    <p>{country} | {fullName}</p>
                </div>
            </div>
            <div style={{ marginLeft: '50px' }}>
                <p className={GroupForumCss.commentContent}>{content}</p>
                {replyForm ?  <ReplyForm commentId={commentId} setSeed={setSeed} groupId={groupId} /> : 
                <UpvoteDownvote id={commentId} isComment={true}  upvotes={upvotes} downvotes={downvotes} setSeed={postSeed} setReplyForm={setReplyForm}>
                    <button 
                        onClick={(e) => { 
                            e.stopPropagation();
                            setReplyForm(true)
                        }}
                        className="grayBgBtn"
                    >
                        Reply
                    </button>    
                </UpvoteDownvote>}
            </div>
            {replies && replies.map((reply) => reply)}
        </div>
    )
}