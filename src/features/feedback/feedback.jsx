import { useState } from 'react';
import { FeedbackCss } from 'stylesheets/feedback';
import FeedbackIcon from '@mui/icons-material/Feedback';


export function Feedback() {
    const [textarea, setTextarea] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setTextarea('');
    }

    return (
        <>
            <h1 className={FeedbackCss.feedbackHeader}><FeedbackIcon sx={{ fontSize: '1.9rem' }} /> Feedback</h1>
            <h3>Share your comments/suggestions/opinions/reports to help us improve StudyFil</h3>
            <form className={FeedbackCss.feedbackForm} onSubmit={handleSubmit}>
                <textarea placeholder="Type a message" value={textarea} onChange={(e) => setTextarea(e.target.value)}></textarea>
                <input type="submit" value="submit" />
            </form>
        </>
    )
}