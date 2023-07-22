import { MainSectionCss } from 'stylesheets/layouts/';
import classnames from 'classnames';

export function MainSection({ children }) {
    return (
        <div id="main-section" className={classnames(MainSectionCss.mainSection)}>
            { children }
        </div>
    )
}