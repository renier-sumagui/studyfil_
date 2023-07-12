import { useRef, useState, useEffect } from 'react';
import { StudyGroupsCss } from 'stylesheets/study-groups';
import classnames from 'classnames';
import { useTopics } from 'hooks/';
import submitGroup from './submit-group.js';
import { useUserContext } from 'context/';
import submitNewTopic from './submit-new-topic.js';
import { profanityFilter } from 'src/utils/';
import { BadWordsAlert } from 'features/alerts/';

export function CreateGroupForm({ handleClose, reload }) {
    const { user } = useUserContext();
    const [suggestedTopic, setSuggestedTopic] = useState('');
    const [allTopics, setAllTopics] = useState();
    const [topic, setTopic] = useState('');
    const [groupName, setGroupName] = useState('');
    const [memberCount, setMemberCount] = useState('');

    const [theory, setTheory] = useState(false);
    const [facts, setFacts] = useState(false);
    const [formal, setFormal] = useState(false);
    const [openChecklist, setOpenChecklist] = useState(false);
    const [alert, setAlert] = useState(false);

    const checklist = (
        <div style={{margin: '10px 0'}}>
            <p style={{ fontSize: 16, fontWeight: '500' }}>The topic you entered is not found. Please answer the checklist below to add and categorize it.</p>
            <label className="displayBlock">
                <input type="checkbox" value="theory" onChange={() => setTheory(prev => !prev)} /> The learning is based on theories rather than skills.
            </label>
            <label className="displayBlock">
                <input type="checkbox" value="facts" onChange={() => setFacts(prev => !prev)} /> The topic to be learned is based on facts and evidence rather than personal opinion and experience.
            </label>
            <label className="displayBlock">
                <input type="checkbox" value="formal" onChange={() => setFormal(prev => !prev)} /> The sources and materials used to gather the information are written in formal language and are written by the professionals in the field.
            </label>
        </div>
    );

    function handleTopicSuggestion() {
        setTopic(suggestedTopic);
        setSuggestedTopic('');
    }

    function handleTopicChange(e) {
        let tempValue = e.target.value;
        let lowerCaseValue = tempValue.toLowerCase();
        setTopic(e.target.value);
        if (allTopics[`${lowerCaseValue}`]) {
            setSuggestedTopic(allTopics[`${lowerCaseValue}`].name);
        } else {
            setSuggestedTopic('');
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const allTopics = await useTopics();

        const filteredGroupName = await profanityFilter(groupName);
        const filteredTopic = await profanityFilter(topic);
        if (filteredGroupName !== groupName || filteredTopic !== topic) {
            setAlert(true);
            setTimeout(() => setAlert(false), 2000)
            return;
        }


        if (openChecklist) {
            setOpenChecklist(false);
            const filteredTopic = await profanityFilter(groupName);
            await submitNewTopic(theory, facts, formal, topic);
            return;
        }

        if (allTopics[topic.toLowerCase()]) {   /* this checks if the entered word is in the topics */
            setOpenChecklist(false);
            let response = await submitGroup(user.id, groupName, allTopics[`${topic.toLocaleLowerCase()}`].id, memberCount);
            console.log(response);
            handleClose(e);
            setSuggestedTopic('');
            setTopic('');
            setGroupName('');
            setMemberCount('');
            reload();
        } else {    /* if the entered word isn't found, open the checklist to add the new topic */
            setOpenChecklist(true);
        }
    }

    useEffect(() => {
        (async function() {
            const allTopics = await useTopics();
            setAllTopics(allTopics);
        })();
    }, [])

    return (
        <>
            {alert && <BadWordsAlert />}
            <form className={StudyGroupsCss.createGroupForm} onSubmit={handleSubmit}>
                <label className={StudyGroupsCss.searchTopics}>
                    Topic
                    <input required  type="text" value={topic} onChange={handleTopicChange} placeholder="e.g. Baking"/>
                    {suggestedTopic && <p onClick={handleTopicSuggestion} className={StudyGroupsCss.suggestedTopic}>{suggestedTopic}</p>}
                </label>
                <label>
                    Group name
                    <input type="text" required value={groupName} onChange={(e) => setGroupName(e.target.value)}  />
                </label>
                {openChecklist && checklist}
                <label>
                    Number of members
                    <input type="number" required value={memberCount} onChange={(e) => setMemberCount(e.target.value)} min="15" />
                </label>
                <div className={ classnames(StudyGroupsCss.buttonGroup, "flex justifySpaceBetween") }>
                    <input type="submit" value="Create Group" className={StudyGroupsCss.createBtn} />
                    <button onClick={ handleClose } className={StudyGroupsCss.cancelBtn}>Cancel</button>
                </div>
            </form>
        </>
    )
}