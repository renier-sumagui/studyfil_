import { MessagesCss } from 'stylesheets/messages';
import classnames from 'classnames';
import { useRef } from 'react';

export function MessageContent({ content, isUser }) {
    return <p className={MessagesCss.messageContent}>{ content }</p>
}

export function MessageBox({ content, username, userIds, initials }) {
    if (userIds.length === 3 && userIds[1] !== userIds[0]) {
        return (
            <div className={MessagesCss.messageBox} style={{ marginTop: '10px' }}>
                <div className={classnames(MessagesCss.userInfoContainer, 'flex alignCenter gap5')}>
                    <div className={MessagesCss.userImg}>{ initials }</div>
                    <span className={MessagesCss.userName}>{ username }</span>
                </div>
                <MessageContent content={content} />
            </div>
        );
    } 
    if (userIds.length === 2) {
        return (
            <div className={MessagesCss.messageBox}>
                <div className={classnames(MessagesCss.userInfoContainer, 'flex alignCenter gap5')}>
                    <div className={MessagesCss.userImg}>{initials}</div>
                    <span className={MessagesCss.userName}>{ username }</span>
                </div>
                <MessageContent content={content} />
            </div>
        )
    }
    if (userIds.length == 1) {
        return (
            <div className={MessagesCss.messageBox}>
                <div className={classnames(MessagesCss.userInfoContainer, 'flex alignCenter gap5')}>
                    <div className={MessagesCss.userImg}>{initials}</div>
                    <span className={MessagesCss.userName}>{ username }</span>
                </div>
                <MessageContent content={content} />
            </div>
        )
    }
}