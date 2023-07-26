import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { MessagesCss } from 'stylesheets/messages';
import { MessageBox } from 'features/messages';
import { MessageContent } from 'features/messages';
import { useMessages } from './use-messages';
import { useUserContext } from 'context/';
import { useMessageContext } from './message-main.jsx';
import { socket } from './socket';
import { getNameInitials } from 'src/utils';


export function MessagesContainer() {
    const { user } = useUserContext();
    const { groupId } = useParams();
    const { group } = useMessageContext();
    const prevRef = useRef(null);
    const chatContainerRef = useRef(null);

    const [messagesArray, setMessagesArray] = useState([]);
    const [messagesReceived, setMessagesReceived] = useState();

    useEffect(() => {
        socket.emit('join_room', { userID: user.id, userName: user.username, groupID: group.id });
        (async function() {
            const response = await useMessages(group.id);
            if (response.hasMessages) {
                const messages = response.messages;
                prevRef.current = messages[messages.length - 1].id;
                let messageComponents = [];

                for (let index = 0; index < messages.length; index++) {
                    let key = crypto.randomUUID();

                    const currUID = messages[index].user_id;
                    const nextUID = index == messages.length - 1 ? currUID : messages[index + 1].user_id;

                    const username = messages[index].username;
                    const content = messages[index].content;
                    const uniqueKey = messages[index].id;
                    const initials = getNameInitials(messages[index].first_name + ' ' + messages[index].last_name);

                    /* Check if the current UserID is equal to the user's ID */
                    if (currUID == user.id) {
                        messageComponents.push(<p key={ uniqueKey } className={ MessagesCss.currentUser }>{ content }</p>)
                        continue;
                    }

                    if (index > 0) {
                        const prevUID = messages[index - 1].user_id;
                        /* Check if the current UserID is equal to the previous UserID */
                        if (currUID == prevUID) { 
                            messageComponents.push(<MessageContent key={ uniqueKey } userId={ messages[index].userId} username={username} content={ messages[index].content } imgSrc="" />)
                        } else {
                            messageComponents.push(<MessageBox key={ uniqueKey } userIds={ [prevUID, currUID, nextUID] } username={ username } content={ content } initials={initials} />);
                        }
                    } else {
                        messageComponents.push(<MessageBox key={uniqueKey} userIds={[currUID, nextUID]} username={username} content={content} initials={initials} />);
                    }
                }
                setMessagesArray(messageComponents);
            } else {
                setMessagesArray([]);
            }
        })();
    }, [group])

    useEffect(() => {
        if (chatContainerRef.current !== null) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messagesArray]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (data.userID == user.id) {
                prevRef.current = user.id;
                setMessagesArray(state => [...state, <p key={ state.length + 1 } className={ MessagesCss.currentUser }>{ data.message }</p>]);
                prevRef.current = data.userID;
            } else {
                if (data.userID == prevRef.current) {
                    setMessagesArray(state => [...state, <p key={ state.length + 1 } className={ MessagesCss.messageContent }>{ data.message }</p>])
                    prevRef.current = data.userID;
                } else {
                    setMessagesArray(state => [...state, <MessageBox key={ state.length + 1 } userIds={ [data.userID] } username={ data.userName } content={ data.message } initials={ data.initials } />])
                    prevRef.current = data.userID;
                }
            }
        })

        socket.on('new_meeting_room', (data) => {
            // console.log(data);
        })

        socket.on('joined', (data) => {
            // console.log(data);
        });

        return () => {
            socket.off('receive_message');
            socket.off('new_meeting_room');
            socket.off('joined');
        }
    }, []);

    return (
        <div className={MessagesCss.messagesContainer} ref={chatContainerRef}>
            {messagesArray.length > 0 ? messagesArray.map((message) => message) : null}
        </div>
    )
}