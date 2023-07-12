import { MessagesCss } from 'stylesheets/messages';
import classnames from 'classnames';
import { useMessageContext } from './message-main';

export function MessageGroupInfo({ groupName }) {
    const { group } = useMessageContext();

    return (
        <div className={classnames(MessagesCss.groupInfo, 'flex alignCenter')}>
            <span className={MessagesCss.groupName}>{group ? group.group_name : null}</span>
        </div>
    )
}