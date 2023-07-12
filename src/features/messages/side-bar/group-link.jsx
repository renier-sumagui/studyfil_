import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MessagesCss } from 'stylesheets/messages';
import classnames from 'classnames';
import { useJoinedGroups } from 'features/study-groups';
import { useUserContext } from 'context/';

export function GroupLink({ id, groupName }) {
    const { user } = useUserContext();

    function checkActive({ isActive, isPending }) {
        if (isActive) {
            return 'activeLink';
        }
        return null;
    }

    return (
            <li><NavLink className={checkActive} to={`/messages/${id}`}>{ groupName }</NavLink></li>
    )
}