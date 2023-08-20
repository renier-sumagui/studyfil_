import { useEffect, useState } from 'react';
import { HomeHeaderCss } from "src/assets/stylesheets/home";
import { NotificationContent } from './notification-content.jsx';
import { useNotificationContext } from 'context/';
import { AbsoluteCircular } from 'features/loading/absolute-circular.jsx';


export function NotificationModal() {
    const { notifications } = useNotificationContext();
    const [loading, setLoading] = useState(true);
    const [notificationsArray, setNotificationsArray] = useState();

    useEffect(() => {
        if (notifications.hasNotifications) {
            setNotificationsArray(notifications.notifications);
        }
        setLoading(false);
    }, [notifications])

    return (
        <div className={HomeHeaderCss.notificationModal}>
            {loading && <p className={HomeHeaderCss.noNotification}>Loading please wait...</p>}
            {!loading && !notificationsArray ? <p className={HomeHeaderCss.noNotification}>Notification is empty.</p> : null}
            {notificationsArray && notificationsArray.map((notification) => {
                return <NotificationContent 
                            key={notification.id} 
                            notificationId={notification.id}
                            username={notification.username}
                            type={notification.type} 
                            seen={notification.seen}
                            content={notification.content}
                            referenceId={notification.reference_id}
                            groupId={notification.group_id}
                            postId={notification.post_id}
                            groupName={notification.group_name}
                            datetime={notification.created_at}
                        />      
            })}
        </div>
    )
}