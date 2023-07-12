import { SettingsCss } from 'stylesheets/settings';
import ClearIcon from '@mui/icons-material/Clear';
import classnames from 'classnames';
import { useTopicsSettingsContext } from './topics-settings-context';

export function TopicCard({ id, topicName }) {
    const { interestedTopics, setInterestedTopics } = useTopicsSettingsContext();

    function removeTopic(e) {
        e.preventDefault();
        const tempInterest = {...interestedTopics};
        delete tempInterest[topicName];
        setInterestedTopics({...tempInterest});
    }

    return (
        <div className={SettingsCss.topicCard}>
            <span>{topicName}</span>
            <button 
                className={classnames('iconButton')} 
                onClick={removeTopic}
            >
                <ClearIcon className={SettingsCss.removeIcon} />
            </button>
        </div>
    )
}