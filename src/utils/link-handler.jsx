import { useNavigate } from 'react-router-dom';


export function linkHandler(event) {
    const navigate = useNavigate();

    event.preventDefault();
    const path = event.target.getAttribute('href');
    console.log(path);
    navigate(path);
}