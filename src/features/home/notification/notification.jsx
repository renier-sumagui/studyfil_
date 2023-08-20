import { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { NotificationModal } from './notification-modal.jsx';
import { useNotificationContext } from 'src/context/index.js';

export function Notification() {
    const { notifications } = useNotificationContext();
    const [openModal, setOpenModal] = useState(false);

    function handleClick(e) {
        setOpenModal(prev => !prev);
    }

    return (
        <div style={{ position: 'relative' }}>
            <IconButton
                onClick={handleClick}
            >
                <Badge 
                    badgeContent={notifications.notSeen} 
                    max={99} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                    color="error"
                >
                    <NotificationsIcon sx={{ color: '#000080' }}/>
                </Badge>
            </IconButton>
            {openModal && <NotificationModal />}
        </div>
    )
}