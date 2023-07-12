import { useState } from 'react';
import { GroupForumCss } from 'stylesheets/group-forum';
import { useGroupContext } from 'features/group-forum';
import submitQuestionForm from './submit-question-form.js';
import { useUserContext } from 'context/';
import { profanityFilter } from 'src/utils/';
import { BadWordsAlert } from 'features/alerts/';

export function PostQuestionForm({ handleClose }) {
    const { group } = useGroupContext();
    const { user } = useUserContext();
    const [question, setQuestion] = useState('');
    const [alert, setAlert] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const filteredQuestion = await profanityFilter(question);
        if (filteredQuestion !== question) {
            console.log(question);
            console.log(filteredQuestion);
            setAlert(true);
            setTimeout(() => setAlert(false), 2000);
            return;
        } else {
            const result = await submitQuestionForm(user.id, group.id, question);
            setQuestion('');
            handleClose(e);
        }
    }

    return (
        <form className={GroupForumCss.postQuestionForm} onSubmit={handleSubmit}>
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