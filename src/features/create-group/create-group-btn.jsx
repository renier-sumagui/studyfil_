import { useRef } from 'react';

import { StudyGroupsCss } from 'stylesheets/study-groups';
import { CreateGroupModal } from './create-group-modal.jsx';
import AddIcon from '@mui/icons-material/Add';

export function CreateGroupBtn({ reload }) {

    const modalRef = useRef(null);

    function handleModal() {
        modalRef.current.showModal();
    }

    return (
        <>
            <CreateGroupModal modalRef={ modalRef } reload={ reload } />
            <button className={ StudyGroupsCss.createGroupBtn } onClick={ handleModal }>
                <AddIcon sx={{ color: 'white' }} />
            </button>
        </>
    )
}