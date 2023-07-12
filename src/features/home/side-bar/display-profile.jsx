import { useEffect, useState } from 'react';
import { DisplayProfileCss } from 'stylesheets/home/';
import classnames from 'classnames';
import { useUserContext } from 'context/';
import { getNameInitials } from 'src/utils';
import Avatar from '@mui/material/Avatar';

export function DisplayProfile() {
    const { user } = useUserContext();
    const [initials, setInitials] = useState();

    useEffect(() => {
        setInitials(getNameInitials(user.first_name + ' ' + user.last_name));
    }, []);

    return (
        <div 
            className={classnames(
                DisplayProfileCss.displayProfileContainer, 
                'flex', 
                'alignCenter',
                'flexDirectionColumn'
        )}>
            <div className={DisplayProfileCss.profileImage}>{initials}</div>
            <a href="#" className={DisplayProfileCss.profileName}>{user.username}</a>
        </div>
    )
}