import classnames from 'classnames';
import { GroupCardCss, StudyGroupsCss } from 'stylesheets/study-groups';
import { GroupCardSkeleton } from 'features/study-groups';

export function GroupLoad() {
    return (
        <div className={classnames(StudyGroupsCss.groupsContainer, 'flex wrap')} style={{ marginTop: '-8px' }}>
            <GroupCardSkeleton />
            <GroupCardSkeleton />
            <GroupCardSkeleton />
        </div>
    )
}