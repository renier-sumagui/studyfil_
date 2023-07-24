import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { GroupForumCss } from "stylesheets/group-forum";
import { useUserContext } from 'context/';

function ConfirmLeaveModal({ modalRef, closeModal, groupId, userId }) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    
    async function handleLeave() {
        setDisabled(true);
        await Axios.post('https://studyfil-api.onrender.com/groups/leave', { userId, groupId }, { withCredentials: true });
        navigate('/groups/joined');
        setDisabled(false);
    }

    return (
        <dialog ref={modalRef}>
            <p>Are you sure to leave this group?</p>
            <div className="flex justifySpaceBetween" style={{ marginTop: '20px' }}>
                <button className="buttonDanger" onClick={handleLeave} disabled={disabled}>Yes</button>
                <button className="buttonSuccess" onClick={() => closeModal()} disabled={disabled}>No</button>
            </div>
        </dialog>
    )
}

export function LeaveGroupButton({ userId, groupId }) {
    const navigate = useNavigate();
    const { user } = useUserContext();
    const modalRef = useRef(null);

    function openModal() {
        modalRef.current.showModal();
    }
    function closeModal() {
        modalRef.current.close();
    }

    return (
        <>
            <button className={GroupForumCss.leaveBtn} onClick={() => openModal()}>Leave Group</button>
            <ConfirmLeaveModal modalRef={modalRef} groupId={groupId} closeModal={closeModal} userId={userId} />
        </>
    )
}