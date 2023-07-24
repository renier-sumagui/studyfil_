import Axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useUserContext } from 'context/';
import { SettingsCss } from 'stylesheets/settings';
import { SmallCircularProgress } from 'features/loading';
import { useTopicsSettingsContext } from './topics-settings-context';
import { InterestedTopicsContainer } from './interested-topics-container.jsx';
import { submitTopics } from './submit-topics.js';
import { SuccessAlert } from 'features/alerts';

export function SearchTopicsForm({ open, setOpen }) {
    const [value, setValue] = useState('');
    const valueRef = useRef(null);
    const { user } = useUserContext();
    const { topicsObject, setInterestedTopics, interestedTopics, setSeed } = useTopicsSettingsContext();
    const [success, setSuccess] = useState(false);

    const [topics, setTopics] = useState();

    const [suggestions, setSuggestions] = useState();
    const [loading, setLoading] = useState(false);


    function closeOptions(e) {
        setOpen(false);
    }

    function handleSearch(e) {
        setValue(e.target.value);
    }

    function handleAdd(e) {
        e.preventDefault();
        if (value) {
            if (topicsObject[value.toLowerCase()]) {
                let key = topicsObject[value.toLowerCase()].name;
                let id = topicsObject[value.toLowerCase()].id;
                let temp = {...interestedTopics};
                temp[key] = { id: id };
                setInterestedTopics({...temp});
            }
        } else {
            return;
        }
    }

    function handleTopicClick(topicName) {
        setValue(topicName);
        valueRef.current.focus();
    }

    useEffect(() => {
        if (open) {
            (async function() {
                setLoading(true);
                const response = await Axios.get(`https://studyfil-api.onrender.com/topics/all`);
                setLoading(false);

                setTopics(response.data.topics);
                setSuggestions(response.data.topics.map((topic) => {
                    return <p 
                                key={topic.key}
                                onMouseDown={() => {
                                    handleTopicClick(topic.name);
                                    setOpen(false);
                                }}
                                onClick={(e) => { 
                                    valueRef.current.focus() 
                                    e.stopPropagation();
                                }}
                            >
                                    {topic.name}
                            </p>
                }));
            })();
        }
    }, [open])

    useEffect(() => {
        (function() {
            if (topics) {
                const tempArr = [];
                for (let pointer = 0; pointer < topics.length; pointer++) {
                    if(topics[pointer].name.toLowerCase().includes(value.toLowerCase())) {
                        tempArr.push(topics[pointer]);
                    };
                }
                if (tempArr.length > 0) {
                    setSuggestions(tempArr.map((topic) => {
                        return <p 
                                    key={topic.key} 
                                    id={topic.key} 
                                    className={SettingsCss.topicSuggestion}
                                    onMouseDown={() => {
                                        handleTopicClick(topic.name);
                                        setOpen(false);
                                    }}
                                    onClick={(e) => {
                                        valueRef.current.focus()
                                        e.stopPropagation();
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
    }, [value])

    async function handleSubmit(e) {
        e.preventDefault();
        await submitTopics(user.id, interestedTopics);
        setSuccess(true);
        setSeed(Math.random());
        setTimeout(() => setSuccess(false), 1000);
    }

    return (
        <form className={SettingsCss.topicsForm} style={{ position: 'relative' }} onSubmit={handleSubmit} >
            {success && <SuccessAlert message={"Topics of interest updated"} />}
            <div className={SettingsCss.searchContainer}>
                <input 
                    type="text" 
                    value={value}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={() => setOpen(true)}
                    onChange={handleSearch}
                    placeholder="Search topics"
                    style={{ width: '100%' }}
                    className={SettingsCss.searchInput}
                    ref={valueRef}
                />
                {loading && <SmallCircularProgress />}
                <input type="button" value="Add" className="blueButton" style={{ marginLeft: '5px' }} onClick={handleAdd}/>
            </div>
            <div className={SettingsCss.topicsContainer} style={{ display: suggestions ? 'block' : 'none' }}>
                {open && suggestions}
            </div>
            <InterestedTopicsContainer />
            <input type="submit" value="Save changes" className={SettingsCss.saveButton} style={{ position: 'absolute', bottom: '0' }}/>
        </form>
    )
}