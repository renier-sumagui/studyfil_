import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export function AuthHero() {
    return (
        <Grid
            container
            item
            xs={false}
            sm={4}
            md={7}
            direction="column"
            justifyContent="center"
            alignItems="center"
            backgroundColor="#E3F4FE"
            height="100vh"
            position="fixed"
        >
            <Grid item xs={2}>
                <img src="/img/logo2.png" />
            </Grid>
            <Grid item xs={3}>
                <img src="/img/friends.png" />
            </Grid>
            <Grid item xs={3}>
                <Typography variant="h5" color="#00007D" sx={{ textAlign: "center", width: '70%', margin: '0 auto' }}>An online learning community that offers sharing and gaining knowledge on different topics.</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="p" color="#00007D" sx={{ textAlign: "center", width: '70%' }}>Recommended for users 16 years old and above.</Typography>
            </Grid>
      </Grid>
    )
}