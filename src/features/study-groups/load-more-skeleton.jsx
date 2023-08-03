import Skeleton from '@mui/material/Skeleton';
import { GroupCardCss, StudyGroupsCss } from 'stylesheets/study-groups';
import classnames from 'classnames';

export function LoadMoreSkeleton() {
    const skeleton = (
        <Skeleton 
            animation="wave"
            variant="rectangular"
            className={GroupCardCss.groupCardSkeleton}
            height={155}
            sx={{ bgcolor: '#EEF1F4'}}
        />
    )
    return (
        <div className={classnames(StudyGroupsCss.groupsContainer, 'flex wrap')}>
            {skeleton}
            {skeleton}
            {skeleton}
        </div>
    )
}