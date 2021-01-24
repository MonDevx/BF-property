import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";
const useStyles = makeStyles((theme) => ({
  howtoContent: {
    backgroundColor: theme.palette.primary.light,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(15),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 2),
  },
  section: {
    display: "flex",
    overflow: "hidden",
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function Sectionhowto() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.howtoContent}>
      <section className={classes.section}>
        <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h5">{t("howtoheader")}</Typography>
              <Typography variant="h4" color="primary">
                {t("howtosubheader")}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.item}>
                <Typography variant="h5" className={classes.title}>
                  {t("header1.howto.label")}
                </Typography>

                <LazyLoadImage
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/webp/section-howto/undraw_buffer_wq43.webp"
                  }
                  alt="img1"
                  effect="blur"
                  width="256px"
                  height="170px"
                />
                <Typography variant="subtitle1"  className={classes.title}>
                  {t("subheader1.howto.label")}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.item}>
                <Typography variant="h5" className={classes.title}>
                  {t("header2.howto.label")}
                </Typography>
                <LazyLoadImage
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/webp/section-howto/undraw_all_the_data_h4ki.webp"
                  }
                  alt="img2"
                  effect="blur"
                  width="256px"
                  height="170px"
                />
                <Typography variant="subtitle1"  className={classes.title}>
                  {t("subheader2.howto.label")}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.item}>
                <Typography variant="h5" className={classes.title}>
                  {t("header3.howto.label")}
                </Typography>{" "}
                <LazyLoadImage
                  src={
                    process.env.PUBLIC_URL +
                    "/assets/img/webp/section-howto/undraw_Search_1px8.webp"
                  }
                  alt="img3"
                  effect="blur"
                  width="256px"
                  height="170px"
                />
                <Typography variant="subtitle1"  className={classes.title}>
                  {t("subheader3.howto.label")}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
}
