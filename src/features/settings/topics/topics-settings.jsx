import { useState, useEffect } from 'react';
import { SearchTopicsForm } from "./search-topics-form.jsx";
import { useUserContext } from 'context/';
import { TopicsSettingsContextProvider } from './topics-settings-context.jsx';

export function TopicsSettings() {
    const { user } = useUserContext();
    const [open, setOpen] = useState(false);
    

    return (
        <TopicsSettingsContextProvider>
            <div style={{ padding: '5px' }} onClick={() => setOpen(false)}>
                <SearchTopicsForm open={open} setOpen={setOpen} />
            </div>
        </TopicsSettingsContextProvider>
    )
}