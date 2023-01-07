import React from "react";
import withStyles from "@mui/styles/withStyles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { isWidthUp } from "@mui/material";
import { compose } from "redux";
import { HowItWorkCard } from "../../customs/howitworkcard/howitwork-card.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { howItWorkData } from "./constant/defaultValue.ts"

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) =>
  <WrappedComponent {...props} width="xs" />;

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  content: {
    background:
      "linear-gradient(165.96deg, rgba(35, 56, 135) 29.9%, rgba(8, 172, 145 ) 104.77%)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  container: {
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
    fontWeight: "bold",
  },
  number: {
    fontSize: 25,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },

  card: {
    padding: theme.spacing(3),
  },
});

function Sectionhowitwork(props) {
  const { classes, width } = props;
  const { t } = useTranslation();


  return (
    <div className={classes.content}>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            marked="center"
            className={classes.title}
            component="h2"
          >
            {t("sectionhowitwork.header")}
          </Typography>
        </Grid>
        <Carousel
          additionalTransfrom={0}
          autoPlaySpeed={3000}
          centerMode={false}
          className={classes.root}
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          itemClass={classes.container}
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {howItWorkData.map((element, index) => (
            <Grid
              item
              xs={8}

            >
              <HowItWorkCard
                number={index + 1}
                image={element.image}
                headline={t(element.headline)}
                text={t(element.text)}
              />
            </Grid>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

export default compose(withStyles(styles), withWidth())(Sectionhowitwork);
