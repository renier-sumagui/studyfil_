import { HomeHeader } from 'features/home';
import { SideBar } from 'layouts/';
import { Body } from 'layouts/';
import { MainSection } from 'layouts/'

import { JoinedStudyGroups } from 'features/study-groups';

export function JoinedGroupsRoute() {
    const studyGroups = [
        {id: 1, groupName: 'Group 1 Group 1Group 1', topic: 'Topic 1', owner: 'Owner1', memberCount: '10/10'},
        {id: 2, groupName: 'Group 2', topic: 'Topic 2', owner: 'Owner2', memberCount: '10/10'},
        {id: 3, groupName: 'Group 3', topic: 'Topic 3', owner: 'Owner3', memberCount: '10/10'},
        {id: 4, groupName: 'Group 4', topic: 'Topic 4', owner: 'Owner4', memberCount: '10/10'},
        {id: 5, groupName: 'Group 5', topic: 'Topic 5', owner: 'Owner5', memberCount: '10/10'},
        {id: 6, groupName: 'Group 6', topic: 'Topic 6', owner: 'Owner6', memberCount: '10/10'},
        {id: 7, groupName: 'Group 7', topic: 'Topic 7', owner: 'Owner7', memberCount: '10/10'},
        {id: 8, groupName: 'Group 8', topic: 'Topic 8', owner: 'Owner8', memberCount: '10/10'},
        {id: 9, groupName: 'Group 9', topic: 'Topic 9', owner: 'Owner9', memberCount: '10/10'},
        {id: 10, groupName: 'Group 10', topic: 'Topic 10', owner: 'Owner10', memberCount: '10/10'},
        {id: 11, groupName: 'Group 11', topic: 'Topic 11', owner: 'Owner11', memberCount: '10/10'},
        {id: 12, groupName: 'Group 12', topic: 'Topic 12', owner: 'Owner12', memberCount: '10/10'},
        {id: 13, groupName: 'Group 13', topic: 'Topic 13', owner: 'Owner13', memberCount: '10/10'},
        {id: 14, groupName: 'Group 14', topic: 'Topic 14', owner: 'Owner14', memberCount: '10/10'}
    ];

    return (
        <>
            <JoinedStudyGroups heading="Your groups" groups={studyGroups}/>
        </>
    )
}

export default JoinedGroupsRoute;