import { GroupForumCss } from 'stylesheets/group-forum';
import { PostQuestionForm } from './post-question-form.jsx';
import CloseIcon from '@mui/icons-material/Close';

export function PostQuestionModal({ modalRef, setSeed }) {

    function handleClose(event) {
        event.preventDefault();
        modalRef.current.close();
        setSeed(Math.random());
    }

    return (
        <dialog ref={modalRef} className={GroupForumCss.dialog}>
            <button onClick={handleClose} className={GroupForumCss.modalExitBtn}><CloseIcon /></button>
            <PostQuestionForm handleClose={handleClose}/>
        </dialog>
    )
}