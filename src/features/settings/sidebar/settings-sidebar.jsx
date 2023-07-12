import { NavLink } from 'react-router-dom';
import { SettingsCss } from 'stylesheets/settings';

export function SettingsSidebar() {

    function checkActive({ isActive, isPending }) {
        if (isActive) {
            return 'activeLink';
        }
        return null;
    }

    return (
        <div className={SettingsCss.settingsSidebar}>
            <ul>
                <li><NavLink to="/settings/account" className={checkActive}>Account Information</NavLink></li>
                <li><NavLink to="/settings/password" className={checkActive}>Password Settings</NavLink></li>
                <li><NavLink to="/settings/topics" className={checkActive}>Topics of Interest</NavLink></li>
            </ul>
        </div>
    )
}