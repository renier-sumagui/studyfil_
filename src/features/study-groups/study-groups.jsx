import { useEffect, useState } from 'react';
import { StudyGroupsCss } from 'stylesheets/study-groups';
import { GroupCard } from 'features/study-groups';
import classnames from 'classnames';
import { useDiscoverGroups } from './use-discover-groups.js';
import { useUserContext } from 'context/';
import { Circular } from 'features/loading';

export function StudyGroups({ heading, groups, seed, setSeed, setStudyGroups }) {
  
  function updateStudyGroups(key) {
    setStudyGroups((prevGroups) => prevGroups.filter((group) => group.key !== key));
  }

  return (
    <div className={StudyGroupsCss.studyGroups}>
      <h2>{heading}</h2>
      <div className={classnames(StudyGroupsCss.groupsContainer, 'flex wrap')}>
        {groups.length > 0 ? (
          groups.map((group) => (
            <GroupCard
              groupId={group.id}
              key={group.key} 
              groupName={group.group_name}
              ownerName={group.username}
              topic={group.topic_name}
              owner={group.username}
              memberCount={group.member_count}
              memberLimit={group.member_limit}
              isAcademic={group.is_academic}
              setSeed={setSeed}
              seed={seed}
              onJoinClick={() => updateStudyGroups(group.key)} 
            />
          ))
        ) : (
          <Circular />
        )}
      </div>
    </div>
  );
}