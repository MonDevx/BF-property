import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Listrealestate from "../../list-realestate/list-realestate.component.jsx";
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  markedH4Center: {
    height: 3,
    width: 95,
    display: "block",
    margin: `${theme.spacing(1)} auto 0`,
    backgroundColor: theme.palette.primary.main,
  },
  headertitle: {
    fontWeight: "bold",
  },
}));

export default function Sectionrecommend(props) {
  const classes = useStyles();
  const cards = props.property;
  const { t } = useTranslation();
  return (
    <div className={classes.content}>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography variant="h4" align="center" className={classes.headertitle}>
          {t("header.recommend.label")}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          className={classes.headertitle}
          color="primary"
        >
          {t("subheader.recommend.label")}
        </Typography>
        <div className={classes.markedH4Center}></div>

        {cards ? <Listrealestate property={cards} /> : <renderLoader />}

        <Button
          size="large"
          style={{ marginTop: 8, float: "right" }}
          component={Link}
          to={{
            pathname: "/seach-result",
            state: {
              seachkey: "view",
            },
          }}
          endIcon={<ArrowForwardIosIcon />}
        >
          {t("seeallitem.label")}
        </Button>
      </Container></div>
  );
}
