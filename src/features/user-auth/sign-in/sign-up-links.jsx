import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useLinkHandler } from 'hooks/';



export function SignUpLinks() {
    const linkHandler = useLinkHandler();

    return (        
        <Grid container>
            <Grid item xs>
                <Link href="/signin/identify" variant="body2" onClick={(e) => linkHandler(e)}>Forgot password?</Link>
            </Grid>
            <Grid item>
                <Link href="/signup" variant="body2" onClick={(e) => linkHandler(e)}>Don't have an account? Sign Up</Link>
            </Grid>
        </Grid>
    )
}