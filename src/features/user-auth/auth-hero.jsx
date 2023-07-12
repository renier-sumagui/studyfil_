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
            sx={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E3F4FE"
            }}
        >
            <img src="img/logo2.png" />
            <img src="img/friends.png" />
            <Typography variant="h4" color="#00007D" sx={{ textAlign: "center", width: '70%' }}>An online learning community that offers sharing and gaining knowledge on different topic.</Typography>
      </Grid>
    )
}