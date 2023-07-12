import CircularProgress from '@mui/material/CircularProgress';

import { styled } from '@mui/system';


// const StyledCircularProgress = withStyles(styles)(CircularProgress);

export function SmallCircularProgress() {
    return <CircularProgress 
                size="1.5rem"
                sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '3px'
                }}
            />;
}