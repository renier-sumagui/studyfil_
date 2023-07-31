import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { MessagesCss } from 'stylesheets/messages';
import Skeleton from '@mui/material/Skeleton';
import { LoaderLine } from 'features/loading';

export function MessageHeader() {
    const { groupId } = useParams();
    const [group, setGroup] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        fetch(`https://studyfil-api.onrender.com/groups/get/${groupId}`, {signal: controller.signal})
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                setGroup(data.group)
            })
            .catch(error => {
                throw new Error(error);
            })
        return () => controller.abort();
    }, [groupId])

    return (
        <div className={classnames(MessagesCss.messageHeader, 'flex alignCenter justifySpaceBetween')}>
            {loading && <LoaderLine />}
            <div className={classnames(MessagesCss.groupInfo, 'flex alignCenter')}>
                {loading ? null : <span className={MessagesCss.groupName}>{group.group_name}</span>}
            </div>
        </div>
    )
}