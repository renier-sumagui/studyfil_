import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { GroupForumCss } from 'stylesheets/group-forum';
import { Comment } from 'features/group-forum';
import { CommentForm } from 'features/group-forum';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { usePost } from './use-post.js';
import { Circular } from 'features/loading';
import { useComments } from './use-comments.js';
import { getNameInitials } from 'src/utils/';

export function Post() {
    const navigate = useNavigate();
    const { groupId, postId } = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [loadingPost, setLoadingPost] = useState();
    const [seed, setSeed] = useState(1);
    const [helper, setHelper] = useState();
    const [initials, setInitials] = useState();

    useEffect(() => {
        (async function() {
            let response = await usePost(groupId, postId);
            setPost(response.post);
            setInitials(getNameInitials(response.post.full_name));
            setHelper(<Circular />)
            response = await useComments(postId);
            if (response.hasComments) {
                setComments(response.comments.map((comment) => {
                    return <Comment 
                                key={comment.id}
                                commentId={comment.id}
                                username={comment.username}
                                fullName={comment.fullName}
                                country={comment.country}
                                content={comment.content}
                                timePosted={comment.timePosted}
                                upvotes={comment.upvotes}
                                downvotes={comment.downvotes}
                                postSeed={setSeed}
                                groupId={groupId}
                            />
            }));
            } else {
                setHelper(<p style={{ fontWeight: 'bold', color: 'gray', textAlign: 'center' }}>No answers yet.</p>)
            }
        })()
    }, [seed])

    return (
        <>
            <button className={GroupForumCss.settingsBtn} onClick={() => navigate(-1)}>
                <ArrowBackIosNewIcon />
            </button>
            {post ? (
            <>
                <div className={GroupForumCss.postHeader}>
                    <div className={classnames(GroupForumCss.avatar)}>{initials}</div>
                    <div className={GroupForumCss.postUserInfo}>
                        <p>{post.username}<span style={{ marginLeft: '5px' }} className={GroupForumCss.timePosted}>{post.time_posted}</span></p>
                        <p>{post.country} | {post.full_name}</p>
                    </div>
                </div>
                <h2 className={classnames(GroupForumCss.question, "grayBorderBottom")}>{post.content}</h2>
            </>
            ) : <Circular />}
            <CommentForm postId={postId} setSeed={setSeed} groupId={groupId} />
            {comments ? comments.map((comment) => comment) : helper}
        </>
    )
}