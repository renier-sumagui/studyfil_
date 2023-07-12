import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { useGroups } from 'hooks/';
import { StudyGroupsCss } from 'stylesheets/study-groups';
import { Circular } from 'features/loading';
import { GroupCard } from 'features/study-groups';
import { JoinedGroupCard } from 'features/study-groups';

function SearchContainer({ heading, keyword, children }) {
    return (
        <div className={StudyGroupsCss.studyGroups}>
            <h2>{heading}<h2 style={{ color: '#356599' }}>{keyword}</h2></h2>
            <div className={classnames(StudyGroupsCss.groupsContainer, "flex wrap")}>
                {children}
            </div>
        </div>
    )
}


export default function GroupSearchResultsRoute() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const topic = queryParams.get('topic');
    const group = queryParams.get('group');
    const userId = queryParams.get('user');
    const [seed, setSeed] = useState(1);

    const [groups, setGroups] = useState();
    const [helper, setHelper] = useState();

    const [searchResults, setSearchResults] = useState();

    if (!!topic && !!group) {
        // navigate back
    } else if (topic) {

        useEffect(() => {
            (async function() {
                setHelper(<Circular />)
                const groups = await useGroups('topic', topic, userId);
                setHelper();
                if (groups.hasGroups) {
                    setSearchResults(
                        groups.groups.map((group) => {
                            if (groups.joinedGroups[group.id]) {
                                return (
                                    <JoinedGroupCard 
                                        groupId={group.id}
                                        groupName={group.group_name}
                                        topic={group.topic_name}
                                        owner={group.admin_username}
                                        memberLimit={group.member_limit}
                                        memberCount={group.member_count}
                                    />
                                )
                            } else {
                                return (
                                    <GroupCard 
                                        groupId={group.id}
                                        groupName={group.group_name}
                                        topic={group.topic_name}
                                        owner={group.admin_username}
                                        memberLimit={group.member_limit}
                                        memberCount={group.member_count}
                                        setSeed={setSeed}
                                    />
                                )
                            }
                        })
                    )
                } else {
                    setHelper(<p>No groups with topic <strong>{topic}</strong> found</p>);
                }
            })();
        }, [topic, location.search, seed])

        return (
            <SearchContainer heading={`Showing groups with topic:`} keyword={topic}>
                {helper ? helper : searchResults}
            </SearchContainer>
        )
                
    } else if (group) {

        useEffect(() => {
            (async function() {
                setHelper(<Circular />)
                const groups = await useGroups('group', group, userId);
                setHelper();
                if (groups.hasGroups) {
                    setSearchResults(
                        groups.groups.map((group) => {
                            if (groups.joinedGroups[group.id]) {
                                return (
                                    <JoinedGroupCard 
                                        groupId={group.id}
                                        groupName={group.group_name}
                                        topic={group.topic_name}
                                        owner={group.admin_username}
                                        memberLimit={group.member_limit}
                                        memberCount={group.member_count}
                                    />
                                )
                            } else {
                                return (
                                    <GroupCard 
                                        groupId={group.id}
                                        groupName={group.group_name}
                                        topic={group.topic_name}
                                        owner={group.admin_username}
                                        memberLimit={group.member_limit}
                                        memberCount={group.member_count}
                                        setSeed={setSeed}
                                    />
                                )
                            }
                        })
                    )
                } else {
                    setHelper(<p>No groups with name <strong>{group}</strong> found</p>);
                }
            })();
        }, [group, location.search, seed])

        return (
            <SearchContainer heading={`Showing groups with name:`} keyword={group}>
                {helper ? helper : searchResults}
            </SearchContainer>
        )
    } else {
        return <p>Invalid search query</p>
    }
}