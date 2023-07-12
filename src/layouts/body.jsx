import BodyCss from 'stylesheets/layouts/body.module.css';

export function Body({ children }) {

    return (
        <div className={BodyCss.body}>
            { children }
        </div>
    )
}