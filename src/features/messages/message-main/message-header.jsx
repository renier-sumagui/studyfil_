import { useParams } from 'react-router-dom';
import { MessagesCss } from 'stylesheets/messages';
import { MessageGroupInfo } from 'features/messages';
import classnames from 'classnames';

export function MessageHeader() {
    const { groupId } = useParams();

    return (
        <div className={classnames(MessagesCss.messageHeader, 'flex alignCenter justifySpaceBetween')}>
            <MessageGroupInfo />
        </div>
    )
}