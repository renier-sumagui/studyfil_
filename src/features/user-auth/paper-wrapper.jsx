import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export function PaperWrapper({ children }) {
    return (
        <Grid 
            item xs={12} 
            sm={8} 
            md={5} 
            component={Paper} 
            elevation={6} 
            square 
            sx={{ 
                position: 'relative',
                marginLeft: '58.333333%'
            }}
        >
            { children }
        </Grid>
    )
}