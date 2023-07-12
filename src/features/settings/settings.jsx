import { SettingsCss } from 'stylesheets/settings';
import { SettingsSidebar } from 'features/settings';
import { Outlet } from 'react-router-dom';


export function Settings() {

    return (
        <div className={SettingsCss.settings}>
            <SettingsSidebar />
            <Outlet/>
        </div>
    )
}