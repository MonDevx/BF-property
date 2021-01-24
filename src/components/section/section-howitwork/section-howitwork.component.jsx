import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { useTranslation } from "react-i18next";
const styles = (theme) => ({
  root: {
    display: "flex",
    background:
      "linear-gradient(165.96deg, rgba(35, 56, 135, 0.95) 29.9%, rgba(8, 172, 145, 0.95) 104.77%)",
    overflow: "hidden",
  },
  container: {
    padding: theme.spacing(5),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(0, 3),
  },
  title: {
    fontSize: 25,
    marginBottom: theme.spacing(5),
    color: theme.palette.common.white,
  },
  number: {
    fontSize: 25,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 150,
    margin: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(3),
  },
});

function Sectionhowitwork(props) {
  const { classes } = props;
  const { t } = useTranslation();
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          {t("sectionhowitwork.header")}
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Card align="center" className={classes.card}>
                <Typography
                  variant="subtitle1"
                  align="center"
                  className={classes.number}
                >
                  1.
                </Typography>
                <LazyLoadImage
                  alt="img1"
                  src={process.env.PUBLIC_URL + "/assets/img/img1.webp"}
                  className={classes.image}
                  effect="blur"
                />
                <Typography variant="h5" align="center">
                  {t("sectionhowitwork.headeritem1")}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {t("sectionhowitwork.sub1")}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card align="center" className={classes.card}>
                <Typography
                  variant="subtitle1"
                  align="center"
                  className={classes.number}
                >
                  2.
                </Typography>
                <LazyLoadImage
                  alt="img2"
                  src={process.env.PUBLIC_URL + "/assets/img/img3.webp"}
                  className={classes.image}
                  effect="blur"
                />
                <Typography variant="h5" align="center">
                  {t("sectionhowitwork.headeritem2")}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {t("sectionhowitwork.sub2")}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card align="center" className={classes.card}>
                <Typography
                  variant="subtitle1"
                  align="center"
                  className={classes.number}
                >
                  3.
                </Typography>
                <LazyLoadImage
                  alt="img3"
                  src={process.env.PUBLIC_URL + "/assets/img/img2.webp"}
                  className={classes.image}
                  effect="blur"
                />
                <Typography variant="h5" align="center">
                  {t("sectionhowitwork.headeritem3")}
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {t("sectionhowitwork.sub3")}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Container>
    </section>
  );
}

export default withStyles(styles)(Sectionhowitwork);
