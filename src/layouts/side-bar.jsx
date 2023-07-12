import { SideBarCss } from 'stylesheets/layouts/';
import classnames from 'classnames';

import { DisplayProfile } from 'features/home';
import { SideBarLinks } from 'features/home';

export function SideBar() {

return (
        <div className={classnames(SideBarCss.sidebar)}>
            <DisplayProfile />
            <SideBarLinks />
        </div>
    );
}