import { useNavigate } from 'react-router-dom';

export function useLinkHandler() {
    const navigate = useNavigate();

    function linkHandler(event) {
        event.preventDefault();

        const path = event.target.getAttribute('href');
        navigate(path);
    }

    return linkHandler;
}