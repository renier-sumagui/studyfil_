import { useState } from 'react';
import { GroupForumCss } from 'stylesheets/group-forum';
import { useGroupContext } from 'features/group-forum';
import submitQuestionForm from './submit-question-form.js';
import { useUserContext } from 'context/';
import { profanityFilter, getCurrentDatetime } from 'src/utils/';
import { BadWordsAlert } from 'features/alerts/';
import { AbsoluteCircular } from 'features/loading';
import { useWordsContext } from 'context/';
import Axios from 'axios';

export function PostQuestionForm({ handleClose }) {
    const { group } = useGroupContext();
    const { user } = useUserContext();
    const [question, setQuestion] = useState('');
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const { words } = useWordsContext();

    async function handleSubmit(e) {
        e.preventDefault();
        const filteredQuestion = await profanityFilter(question, words);
        if (filteredQuestion !== question) {
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
            return;
        } else {
            setLoading(true);
            const result = await submitQuestionForm(user.id, group.id, question);
            Axios.post('https://studyfil-api.onrender.com/user/notification/add', { 
                userWhoNotified: user.id,
                referenceId: group.id,
                eventId: 2,
                groupId: group.id,
                datetime: getCurrentDatetime()
            }, { withCredentials: true });
            setLoading(false);
            setQuestion('');
            handleClose(e);
        }
    }

    return (
        <form className={GroupForumCss.postQuestionForm} onSubmit={handleSubmit}>
            {loading && <AbsoluteCircular />}
            {alert && <BadWordsAlert />}
            <textarea 
                value={question} 
                className={GroupForumCss.questionContent} 
                placeholder="Tip: Ask an open ended question."
                onChange={(e) => setQuestion(e.target.value)}
            >
            </textarea>
            <div className={GroupForumCss.formBtns}>
                <button className={GroupForumCss.cancelPostBtn} onClick={handleClose}>Cancel</button>
                <input 
                    type="submit" 
                    value="Post question" 
                    className={GroupForumCss.submitPostBtn} 
                    disabled={question ? false : true} 
                />
            </div>
        </form>
    )
}