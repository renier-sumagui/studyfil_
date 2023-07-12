import { GroupForumCss } from 'stylesheets/group-forum';
import { UpvoteDownvote } from '../comment';
import classnames from 'classnames';
import { getNameInitials } from 'src/utils';

export function Reply({ replyId, username, fullName, country, content, timePosted, upvotes, downvotes, setSeed }) {
    const initials = getNameInitials(fullName);

    return (
        <div className={GroupForumCss.reply}>
            <div className={classnames(GroupForumCss.commentHeader, 'flex alignCenter')}>
                <div className={GroupForumCss.avatar}>{initials}</div>
                <div className={GroupForumCss.postUserInfo}>
                    <p>{username}<span style={{ marginLeft: '5px' }} className={GroupForumCss.timePosted}>{timePosted}</span></p>
                    <p>{country} | {fullName}</p>
                </div>
            </div>
            <div style={{ marginLeft: '50px' }}>
                <p>{content}</p>
                <UpvoteDownvote id={replyId} isComment={false} setSeed={setSeed} upvotes={upvotes} downvotes={downvotes} />
            </div>
        </div>
    )
}