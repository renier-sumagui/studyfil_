import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { GroupForumCss } from "stylesheets/group-forum";
import { useUserContext } from 'context/';

function ConfirmLeaveModal({ modalRef, closeModal, groupId, userId }) {
    const navigate = useNavigate();
    
    async function handleLeave() {
        await Axios.post('http://localhost:8000/groups/leave', { userId, groupId }, { withCredentials: true });
        navigate('/groups/joined');
    }

    return (
        <dialog ref={modalRef}>
            <p>Are you sure to leave this group?</p>
            <div className="flex justifySpaceBetween" style={{ marginTop: '20px' }}>
                <button className="buttonDanger" onClick={handleLeave}>Yes</button>
                <button className="buttonSuccess" onClick={() => closeModal()}>No</button>
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