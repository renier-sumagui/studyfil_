import { useRef, useEffect, useState } from 'react';
import classnames from 'classnames';
import { GroupForumCss } from 'stylesheets/group-forum';
import { PostQuestionModal } from './post-question-modal.jsx';
import { useUserContext } from 'context/';
import { getNameInitials } from 'src/utils';

export function PostQuestion({ setSeed }) {
    const modalRef = useRef(null);
    const { user } = useUserContext();
    const [initials, setInitials] = useState();

    function handleOpen() {
        modalRef.current.showModal();
    }

    useEffect(() => {
        setInitials(getNameInitials(user.first_name + ' ' + user.last_name));
    }, [])

    return (
        <>
            <div className={classnames(GroupForumCss.postQuestion, "flex alignCenter", GroupForumCss.wrapper)} onClick={handleOpen}>
                <div className={GroupForumCss.avatar}>{initials}</div>
                <h3 className="grayFont">Post a question.</h3>
            </div>
            <PostQuestionModal modalRef={modalRef} setSeed={setSeed} />
        </>
    )
}