import { MainSectionCss } from 'stylesheets/layouts/';
import classnames from 'classnames';

export function MainSection({ children }) {
    return (
        <div className={classnames(MainSectionCss.mainSection)}>
            { children }
        </div>
    )
}