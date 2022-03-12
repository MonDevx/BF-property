import React from "react";
import withStyles from '@mui/styles/withStyles';
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { isWidthUp } from "@mui/material";
import { compose } from "redux";
import { HowItWorkCard } from "../../customs/howitworkcard/howitwork-card.jsx";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const styles = (theme) => ({
  root: {
    display: "flex",
    background:
      "linear-gradient(165.96deg, rgba(35, 56, 135) 29.9%, rgba(8, 172, 145 ) 104.77%)",
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
    fontWeight: 'bold'
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
  const { classes, width } = props;
  const { t } = useTranslation();
  const howItWork = [
    {
      headline: t("sectionhowitwork.headeritem1"),
      image: "./assets/img/img1.webp",
      text: t("sectionhowitwork.sub1"),
      mdDelay: "700",
      smDelay: "700",
    },
    {
      headline: t("sectionhowitwork.headeritem2"),
      image: "./assets/img/img2.webp",
      text: t("sectionhowitwork.sub2"),
      mdDelay: "300",
      smDelay: "300",
    },
    {
      headline: t("sectionhowitwork.headeritem3"),
      image: "./assets/img/img3.webp",
      text: t("sectionhowitwork.sub3"),
      mdDelay: "700",
      smDelay: "700",
    },
  ];
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
            {howItWork.map((element, index) => (
              <Grid
                item
                xs={12}
                md={4}
                // data-aos="zoom-in-up"
                // data-aos-delay={
                //   isWidthUp("md", width) ? element.mdDelay : element.smDelay
                // }
              >
                <HowItWorkCard
                  number={index + 1}
                  image={element.image}
                  headline={element.headline}
                  text={element.text}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </section>
  );
}

export default compose(withStyles(styles), withWidth())(Sectionhowitwork);
