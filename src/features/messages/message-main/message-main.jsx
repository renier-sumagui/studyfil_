import { useContext, createContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { MessagesCss } from "stylesheets/messages";
import { MessagesContainer, MessageForm, MessageHeader } from 'features/messages';
import { useParams } from 'react-router-dom';

const MessageContext = createContext();

export function useMessageContext() {
    return useContext(MessageContext);
}

export function MessageMain() {
    const { groupId } = useParams();
    const [group, setGroup] = useState();

    useEffect(() => {
        let controller = new AbortController();
        (async function() {
            const response = await Axios.get(`https://studyfil-api.onrender.com/groups/get/${groupId}`);
            setGroup(response.data.group);
        })();
        return () => controller.abort();
    }, [groupId])

    return (
        <MessageContext.Provider value={{ group }}>
            <div className={MessagesCss.messageMain}>
                {group ? 
                <>
                    <MessageHeader group={group} />
                    <MessagesContainer />
                    <MessageForm />
                </> : null}
            </div>
        </MessageContext.Provider>
    )
}