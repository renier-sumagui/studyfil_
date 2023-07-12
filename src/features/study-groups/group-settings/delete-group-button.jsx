import { useRef } from 'react';
import { GroupForumCss } from "stylesheets/group-forum";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ConfirmDeleteModal({ modalRef, closeModal, groupId }) {
    const navigate = useNavigate();
    
    async function handleDelete() {
        await Axios.delete(`https://studyfil-api.onrender.com/groups/delete/${groupId}`);
        navigate('/groups/joined');
    }

    return (
        <dialog ref={modalRef}>
            <p>Are you sure to delete this group?</p>
            <div className="flex justifySpaceBetween" style={{ marginTop: '20px' }}>
                <button className="buttonDanger" onClick={handleDelete}>Yes</button>
                <button className="buttonSuccess" onClick={() => closeModal()}>No</button>
            </div>
        </dialog>
    )
}

export function DeleteGroupButton({ groupId }) {
    const modalRef = useRef(null);

    function openModal() {
        modalRef.current.showModal();
    }
    function closeModal() {
        modalRef.current.close();
    }

    return (
        <>
            <button className={GroupForumCss.deleteBtn} onClick={() => openModal()}>Delete group</button>
            <ConfirmDeleteModal modalRef={modalRef} closeModal={closeModal} groupId={groupId} />
        </>
    )
}