import { MessagesCss } from 'stylesheets/messages';
import classnames from 'classnames';
import { useRef } from 'react';

export function MessageContent({ content, isUser }) {
    return <p className={MessagesCss.messageContent}>{ content }</p>
}

export function MessageBox({ content, username, userIds, initials }) {

    const marginTop = {marginTop: '10px'}
    console.log(initials);

    if (userIds.length === 3 && userIds[1] !== userIds[0]) {
        console.log(initials)

        return (
            <div className={MessagesCss.messageBox} style={marginTop}>
                <div className={classnames(MessagesCss.userInfoContainer, 'flex alignCenter gap5')}>
                    <div className={MessagesCss.userImg}>{ initials }</div>
                    <span className={MessagesCss.userName}>{ username }</span>
                </div>
                <MessageContent content={content} />
            </div>
        );
    } 
    if (userIds.length === 2) {
        console.log(initials)
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
        console.log(initials)

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