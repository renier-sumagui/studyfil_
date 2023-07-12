import { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { GroupForumCss } from 'stylesheets/group-forum';
import classnames from 'classnames';
import { useUserContext } from 'context/';
import { getNameInitials } from 'src/utils';

function KickBtn({ userId, username, groupId, setSeed }) {
    const modalRef = useRef(null)
    const [reports, setReports] = useState();

    async function handleKick() {
        const response = await Axios.delete(`https://studyfil-api.onrender.com/groups/${groupId}/member/${userId}`);
        setSeed(Math.random());
        modalRef.current.close();
    }

    useEffect(() => {
        (async function() {
            const response = await Axios.get(`https://studyfil-api.onrender.com/groups/${groupId}/memberreports/${userId}`)
            setReports(response.data.reports);
        })();
    }, [])

    return (
        <div>  
            {reports > 0 ? <span className={GroupForumCss.reportCount}>{reports} {reports > 1 ? 'reports' : 'report'}</span> : null}
            <button className={GroupForumCss.dangerBtn} onClick={() => modalRef.current.showModal()}>Kick</button>
            <dialog ref={modalRef}>
                <p style={{ marginBottom: '20px' }}>Are you sure to kick <span style={{ fontWeight: 500}}>{username}</span>?</p>
                <div className="flex justifySpaceBetween">
                    <button className="buttonDanger" onClick={handleKick}>Yes</button>
                    <button className="buttonSuccess" onClick={() => modalRef.current.close()}>No</button>
                </div>
            </dialog>
        </div>
    )
}

function ReportBtn({ userId, username, groupId, setSeed }) {
    const modalRef = useRef(null)
    const { user } = useUserContext();

    async function handleReport() {
        const response = await Axios.post('https://studyfil-api.onrender.com/groups/reportmember', { userId, groupId, reporterId: user.id }, { withCredentials: true });
        setSeed(Math.random());
        modalRef.current.close();
    }

    

    return (
        <>
            <button className={GroupForumCss.dangerBtn} onClick={() => modalRef.current.showModal()}>Report</button>
            <dialog ref={modalRef}>
                <p style={{ marginBottom: '20px' }}>Are you sure to report <span style={{ fontWeight: 500}}>{username}</span>?</p>
                <div className="flex justifySpaceBetween">
                    <button className="buttonDanger" onClick={handleReport}>Yes</button>
                    <button className="buttonSuccess" onClick={() => modalRef.current.close()}>No</button>
                </div>
            </dialog>
        </>
    )
}

export function MemberInfo({ adminId, groupId, memberId, username, setSeed, initials }) {
    const { user } = useUserContext();

    return (
        <li className={classnames(GroupForumCss.memberInfo, "flex justifySpaceBetween")}>
            <div className="flex alignCenter">
                <div className={GroupForumCss.avatar}>{initials}</div>
                <span>{username}</span>
            </div>
            {user.id === memberId ? 
                null : user.id === adminId ? <KickBtn userId={memberId} username={username} groupId={groupId} setSeed={setSeed} /> :
                    memberId === adminId ? <p>Admin</p> : <ReportBtn userId={memberId} username={username} groupId={groupId} setSeed={setSeed} />}
        </li>
    )
}