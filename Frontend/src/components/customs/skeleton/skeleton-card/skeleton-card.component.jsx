import React from "react";
import Skeleton from '@mui/material/Skeleton';
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));
export const SkletonCard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CardActionArea aria-label={"property"}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          className={classes.cardMedia}
        />
        <CardContent className={classes.cardContent}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5">
                <Skeleton animation="wave" height={10} width="80%" />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Skeleton animation="wave" height={10} width="80%" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton animation="wave" height={10} width="80%" />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={40}
                height={40}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={40}
                height={40}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={40}
                height={40}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={40}
                height={40}
              />
            </Grid>
            <Grid item xs={3}>
              <Skeleton animation="wave" height={10} width="80%" />
            </Grid>
            <Grid item xs={3}>
              <Skeleton animation="wave" height={10} width="80%" />
            </Grid>
            <Grid item xs={3}>
              <Skeleton animation="wave" height={10} width="80%" />
            </Grid>
            <Grid item xs={3}>
              <Skeleton animation="wave" height={10} width="80%" />
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div style={{ marginLeft: "auto" }}>
          <Skeleton animation="wave" variant="rectangular" width={40} height={40} />
        </div>
      </CardActions>
    </React.Fragment>
  );
};
