import { MessageSidebar } from 'features/messages';
import { MessagesCss } from 'stylesheets/messages';
import { Outlet } from 'react-router-dom';

export function Messages() {
    return (
        <div className={MessagesCss.messages}>
            <MessageSidebar />
            <Outlet />
        </div>
    )
}