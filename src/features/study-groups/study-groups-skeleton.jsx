import Skeleton from '@mui/material/Skeleton';
import { GroupCardCss, StudyGroupsCss } from 'stylesheets/study-groups';
import classnames from 'classnames';

export function GroupCardSkeleton() {
    return (
        <Skeleton 
            animation="wave"
            variant="rectangular"
            className={GroupCardCss.groupCardSkeleton}
            height={155}
            sx={{ bgcolor: '#EEF1F4'}}
        />
    )
}

export function StudyGroupsSkeleton({ headerWidth }) {
    return (

        <div className={StudyGroupsCss.studyGroups}>
            <Skeleton 
                animation="wave"
                variant="rectangular" 
                width={headerWidth} 
                height={32} 
                sx={{ borderRadius: 2, bgcolor: '#EEF1F4' }} 
            />
            <div className={classnames(StudyGroupsCss.groupsContainer, 'flex wrap')}>
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
                <GroupCardSkeleton />
            </div>
        </div>
    )
}