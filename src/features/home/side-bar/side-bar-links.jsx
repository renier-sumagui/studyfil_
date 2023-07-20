import { useRef } from 'react';
import Axios from 'axios';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { SideBarLinksCss as SideLinks }  from 'stylesheets/home';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { SIDEBAR_LINKS1, SIDEBAR_LINKS2} from 'constants/';
import { useSideLinkContext } from 'context/';
import { logout } from 'src/utils';

export function SideBarLinks() {
    const curr = useRef(null);
    const { groupId, postId } = useParams();
    const navigate = useNavigate();
    const { setCurrentLink, currentLink } = useSideLinkContext();

    function checkActive({ isActive, isPending }) {
        if (isActive) {
            return 'activeLink';
        }
        return null;
    }
    
    function handleClick(elementId, solid, outlined) {
        curr.current = elementId;
        setCurrentLink(elementId);
    }

    async function handleLogout() {
        await Axios.get('https://studyfil-api.onrender.com/user/logout', { withCredentials: true });
        navigate('/signin');
    }

    return (
        <>
            <ul className={SideLinks.ul}>
                {SIDEBAR_LINKS1.map((link) => {
                    return (
                        <li onClick={() => handleClick(link.id)} key={`${link.id}`}>
                            <NavLink id={`${link.id}`} to={`${link.path}`} >
                                <span>{curr.current == link.id ? link.solid : link.outlined}</span> {link.name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            <ul className={SideLinks.ul}>
                {SIDEBAR_LINKS2.map((link) => {
                    return (
                        <li onClick={() => handleClick(link.id)} key={`${link.id}`}>
                            <NavLink id={`${link.id}`} to={`${link.path}`} >
                                <span>{curr.current == link.id ? link.solid : link.outlined}</span> {link.name}
                            </NavLink>
                        </li>
                    )
                })}
                <li>
                    <NavLink 
                        onClick={handleLogout}
                    >
                        <span><LogoutOutlinedIcon /></span> Logout
                    </NavLink>
                </li>
            </ul>
        </>
    )
}