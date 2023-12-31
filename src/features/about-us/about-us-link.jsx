import { Link } from 'react-router-dom';
import { AboutUsCss } from 'stylesheets/about-us';

export function AboutUsLink() {
    return <Link to="/about" target="_blank" className={AboutUsCss.aboutUsLink}>About us</Link>
}