import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { MessagesCss } from 'stylesheets/messages';
import { MessageBox } from 'features/messages';
import { MessageContent } from 'features/messages';
import { useMessages } from './use-messages';
import { useUserContext } from 'context/';
import { useMessageContext } from './message-main.jsx';
import { socket } from './socket';
import { getNameInitials } from 'src/utils';
import { MessageSkeleton } from './message-skeleton.jsx';

function scrollToBottom(containerRef) {       
    if (containerRef.current !== null) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
}

function getMessages(user, response, prevRef) {
    const messages = response.messages;
    prevRef.current = messages[messages.length - 1].id;
    let messageComponents = [];

    for (let index = 0; index < messages.length; index++) {
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
    return messageComponents;
}


export function MessagesContainer() {
    const { user } = useUserContext();
    const { groupId } = useParams();
    const { group } = useMessageContext();
    const prevRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [page, setPage] = useState(1);
    const [initialLoading, setInitialLoading] = useState(false);

    const [messagesArray, setMessagesArray] = useState([]);
    const [messagesReceived, setMessagesReceived] = useState();
    const messagesArrayRef = useRef(messagesArray);
    const pageRef = useRef(page);
    const [newMessage, setNewMessages] = useState(1);

    async function handleScroll() {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer.scrollTop === 0) {
            const response = await useMessages(group.id, pageRef.current);
            if (response.hasMessages) {
                setPage(prev => prev + 1);
                const messages = await getMessages(user, response, prevRef);
                setMessagesArray(prev => [...messages, ...prev]);
                chatContainerRef.current.scrollTop = 10;
            }
        }
    };

    useEffect(() => {
        socket.emit('join_room', { userID: user.id, userName: user.username, groupID: group.id });
        setPage(1);
        setMessagesArray([]);
        const axiosRequest = Axios.CancelToken.source();
        (async function() {
            setInitialLoading(true);
            const response = await Axios.get(`https://studyfil-api.onrender.com/messages/${groupId}?page=${1}`, { cancelToken: axiosRequest.token });
            if (response.data.hasMessages) {
                setPage(prev => prev + 1);
                const messages = getMessages(user, response.data, prevRef);
                setMessagesArray(messages);
            }
            setInitialLoading(false);
            setTimeout(() => scrollToBottom(chatContainerRef), 100);
        })();
        return () => axiosRequest.cancel();
    }, [groupId])

    useEffect(() => {
        const main = document.getElementById("message-container");
        main.addEventListener('scroll', handleScroll);

        socket.on('receive_message', (data) => {
            setNewMessages(Math.random());
            if (data.userID == user.id) {
                prevRef.current = user.id;
                setMessagesArray(prev => [...prev, <p key={ prev.length + 1 } className={ MessagesCss.currentUser }>{ data.message }</p>]);
                prevRef.current = data.userID;
            } else {
                if (data.userID == prevRef.current) {
                    setMessagesArray(prev => [...prev, <p key={ prev.length + 1 } className={ MessagesCss.messageContent }>{ data.message }</p>])
                    prevRef.current = data.userID;
                } else {
                    setMessagesArray(prev => [...prev, <MessageBox key={ prev.length + 1 } userIds={ [data.userID] } username={ data.userName } content={ data.message } initials={ data.initials } />])
                    prevRef.current = data.userID;
                }
            }
        });

        socket.on('new_meeting_room', (data) => {
            // console.log(data);
        });

        socket.on('joined', (data) => {
            // console.log(data);
        });

        return () => {
            socket.off('receive_message');
            socket.off('new_meeting_room');
            socket.off('joined');
            main.removeEventListener('scroll', handleScroll);
        }
    }, [groupId]);

    useEffect(() => {
        messagesArrayRef.current = messagesArray;
        pageRef.current = page;
    }, [messagesArray]);

    useEffect(() => {   
        scrollToBottom(chatContainerRef);
    }, [newMessage])

    return (
        <div id="message-container" className={MessagesCss.messagesContainer} ref={chatContainerRef}>
            {!initialLoading ? messagesArray.map((message) => message) : <MessageSkeleton />}
            {/* {initialLoad && <MessageSkeleton />} */}
        </div>
    )
}