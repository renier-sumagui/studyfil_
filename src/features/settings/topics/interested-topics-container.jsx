import { useEffect, useState } from 'react';
import { TopicCard } from './topic-card.jsx';
import { SettingsCss } from 'stylesheets/settings';
import { useTopicsSettingsContext } from './topics-settings-context.jsx';

export function InterestedTopicsContainer() {
    const { interestedTopics } = useTopicsSettingsContext();
    const [cardArray, setCardArray] = useState([]);

    useEffect(() => {
        const tempArray = [];
        for (let key in interestedTopics) {
            tempArray.push(<TopicCard key={interestedTopics[key].id} topicName={key} />)
        }
        setCardArray(tempArray);
    }, [interestedTopics])

    return (
        <div className={SettingsCss.interestedTopicsContainer}>
            {cardArray.length > 0 && cardArray}
        </div>
    )
}