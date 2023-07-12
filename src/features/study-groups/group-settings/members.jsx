import { useEffect, useState } from 'react';
import { MemberInfo } from './member-info.jsx';
import { useMembers } from './use-members.js';
import { getNameInitials } from 'src/utils/';

export function Members({ adminId, groupId }) {
    const [members, setMembers] = useState();
    const [seed, setSeed] = useState(1)

    useEffect(() => {
        (async function() {
            const response = await useMembers(groupId);
            if (response.hasMembers) {
                setMembers(response.members.map((member) => {
                    const initials = getNameInitials(member.first_name + ' ' + member.last_name);

                    return <MemberInfo  
                                key={member.id} 
                                adminId={adminId} 
                                groupId={groupId} 
                                memberId={member.id} 
                                username={member.username} 
                                setSeed={setSeed}
                                initials={initials}
                            />
                }));
            }
        })();
    }, [seed])

    return (
        <ul>
            {members ? members.map((member) => member) : null}
        </ul>
    )
}