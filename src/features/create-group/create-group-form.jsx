import { useRef, useState, useEffect } from 'react';
import { StudyGroupsCss } from 'stylesheets/study-groups';
import classnames from 'classnames';
import { useTopics } from 'hooks/';
import submitGroup from './submit-group.js';
import { useUserContext } from 'context/';
import submitNewTopic from './submit-new-topic.js';
import { profanityFilter } from 'src/utils/';
import { BadWordsAlert } from 'features/alerts/';
import { AbsoluteCircular } from 'features/loading';
import { useWordsContext } from 'context/';
import Axios from 'axios';

export function CreateGroupForm({ handleClose, reload }) {
    const { user } = useUserContext();
    const [suggestedTopic, setSuggestedTopic] = useState('');
    const [allTopics, setAllTopics] = useState();
    const [topic, setTopic] = useState('');
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] =useState('');
    const [memberCount, setMemberCount] = useState('');
    const { words } = useWordsContext();

    const [theory, setTheory] = useState(false);
    const [facts, setFacts] = useState(false);
    const [formal, setFormal] = useState(false);
    const [openChecklist, setOpenChecklist] = useState(false);
    const [alert, setAlert] = useState(false);
    const [topics, setTopics] = useState();

    const [suggestions, setSuggestions] = useState();
    const [open, setOpen] = useState(false);
    const valueRef = useRef(null);
    const [loading, setLoading] = useState(false);

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

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        const allTopics = await useTopics();

        const filteredGroupName = await profanityFilter(groupName, words);
        const filteredTopic = await profanityFilter(topic, words);
        const filteredDescription = await profanityFilter(description, words);

        if (filteredGroupName !== groupName || filteredTopic !== topic || filteredDescription !== description) {
            setAlert(true);
            setTimeout(() => setAlert(false), 2000)
            setLoading(false);
            return;
        }

        if (openChecklist) {
            setOpenChecklist(false);
            const filteredTopic = await profanityFilter(groupName, words);
            await submitNewTopic(theory, facts, formal, topic);
            setLoading(false);
            return;
        }

        if (allTopics[topic.toLowerCase()]) {   /* this checks if the entered word is in the topics */
            setOpenChecklist(false);
            let response = await submitGroup(user.id, groupName, description, allTopics[`${topic.toLocaleLowerCase()}`].id, memberCount);
            setLoading(false);
            handleClose(e);
            setSuggestedTopic('');
            setTopic('');
            setGroupName('');
            setMemberCount('');
            setDescription('');
            reload();
        } else {    /* if the entered word isn't found, open the checklist to add the new topic */
            setLoading(false);
            setOpenChecklist(true);
        }
    }

    function handleTopicClick(topicName) {
        setTopic(topicName);
        const groupName = document.getElementById('group-name');
        // valueRef.current.focus();
        setTimeout(() => groupName.focus(), 0);
    }

    function handleOpen(e) {
        e.stopPropagation();
        setOpen(true)
    }

    useEffect(() => {
        if (open) {
            (async function() {
                const response = await Axios.get(`https://studyfil-api.onrender.com/topics/all`);
                setTopics(response.data.topics);
                setSuggestions(response.data.topics.map((topic) => {
                    return <p 
                                key={topic.key}
                                onMouseDown={() => handleTopicClick(topic.name)} 
                                onClick={(e) => { 
                                    valueRef.current.focus() 
                                    e.stopPropagation();
                                    setOpen(false);
                                }}
                                className={StudyGroupsCss.suggestedTopicWord}
                            >
                                    {topic.name}
                            </p>
                }));
            })();
        }
    }, [open])

    useEffect(() => {
        (async function() {
            const allTopics = await useTopics();
            setAllTopics(allTopics);
        })();
    }, [])

    useEffect(() => {
        (function() {
            if (topics) {
                const tempArr = [];
                for (let pointer = 0; pointer < topics.length; pointer++) {
                    if(topics[pointer].name.toLowerCase().includes(topic.toLowerCase())) {
                        tempArr.push(topics[pointer]);
                    };
                }
                if (tempArr.length > 0) {
                    setSuggestions(tempArr.map((topic) => {
                        return <p 
                                    key={topic.key} 
                                    id={topic.key} 
                                    className={StudyGroupsCss.suggestedTopicWord}
                                    onMouseDown={() => handleTopicClick(topic.name)}
                                    onClick={(e) => {
                                        valueRef.current.focus()
                                        e.stopPropagation();
                                        setOpen(false);
                                    }
                                }
                                >
                                    {topic.name}
                                </p>
                    }))
                } else {
                    setSuggestions([<p>No topics found</p>])
                }
            }
        })();
    }, [topic])

    return (
        <>
            {alert && <BadWordsAlert />}
            <form 
                className={StudyGroupsCss.createGroupForm} 
                onSubmit={handleSubmit} 
                onClick={(e) => { 
                    e.stopPropagation(); 
                    setOpen(false); }}
            >
                {loading && <AbsoluteCircular />}
                <label className={StudyGroupsCss.searchTopics}>
                    Topic
                    <input 
                        required  
                        type="text" 
                        value={topic} 
                        id="group-name"
                        autoComplete="off"
                        onChange={(e) => setTopic(e.target.value)} 
                        onClick={handleOpen} placeholder="e.g. Baking"
                        onBlur={() => setOpen(false)}
                    />
                    {open && 
                        <div className={StudyGroupsCss.suggestedTopic}>
                            {suggestions}
                        </div>
                    }
                </label>
                <label>
                    Group name
                    <input type="text" required value={groupName} onChange={(e) => setGroupName(e.target.value)}  />
                </label>
                <label for="description">
                    Description
                    <textarea 
                        value={description} 
                        id="description" 
                        className={StudyGroupsCss.description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    >
                    </textarea>
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