import { createContext, useContext, useState, useEffect } from 'react';
import { useInterestedTopics } from 'hooks/';
import { useUserContext } from 'context/';
import { useTopics } from 'hooks';

const TopicsSettingsContext = createContext();

export function useTopicsSettingsContext() {
    return useContext(TopicsSettingsContext);
}

export function TopicsSettingsContextProvider({ children }) {
    const { user } = useUserContext();
    const [interestedTopics, setInterestedTopics] = useState();
    const [topicsObject, setTopicsObject] = useState();
    const [seed, setSeed] = useState(1);

    useEffect(() => {
        (async function() {
            const response = await useInterestedTopics(user.id);
            if (response.hasTopics) {
                const temp = {}
                response.interestedTopics.map((topic) => {
                    temp[`${topic.topic_name}`] = { id: topic.id }
                });
                setInterestedTopics(temp);
            }

            const topics = await useTopics();
            setTopicsObject(topics);
        })()
    }, [seed])

    return (
        <TopicsSettingsContext.Provider value={{ interestedTopics, setInterestedTopics, topicsObject, setSeed }}>
            { children }
        </TopicsSettingsContext.Provider>
    );
}