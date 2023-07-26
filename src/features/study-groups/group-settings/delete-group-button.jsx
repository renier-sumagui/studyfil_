import { useRef, useState } from 'react';
import { GroupForumCss } from "stylesheets/group-forum";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AbsoluteCircular } from 'features/loading';

function ConfirmDeleteModal({ modalRef, closeModal, groupId }) {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    
    async function handleDelete() {
        setLoading(true);
        await Axios.delete(`https://studyfil-api.onrender.com/groups/delete/${groupId}`);
        navigate('/groups/joined');
        setLoading(false);
    }

    return (
        <dialog ref={modalRef} style={{ position: 'relative' }}>
            {loading && <AbsoluteCircular />}
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