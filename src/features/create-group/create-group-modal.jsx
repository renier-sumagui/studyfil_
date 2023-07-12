import { ModelTraining } from "@mui/icons-material"
import { StudyGroupsCss } from 'stylesheets/study-groups';
import { CreateGroupForm} from './create-group-form.jsx';

export function CreateGroupModal({ modalRef, reload }) {

    function handleClose(event) {
        event.preventDefault();
        modalRef.current.close();
    }

    return (
        <dialog ref={modalRef} id="createGroupModal" className={ StudyGroupsCss.modal }>
                <h3 className={ StudyGroupsCss.modalHeading }>Create Group</h3>
                <CreateGroupForm handleClose={ handleClose } reload={ reload } />
        </dialog>
    )
}