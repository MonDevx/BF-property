import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Listrealestate from "../../list-realestate/list-realestate.component.jsx"
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  markedH4Center: {
    height: 3,
    width: 95,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Sectionrecommend(props) {
  const classes = useStyles();
  const cards = props.todos;
  const { t } = useTranslation();
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Typography variant="h5" align="center">
        {t("header.recommend.label")}
      </Typography>
      <Typography variant="h4" align="center" color="primary">
        {t("subheader.recommend.label")}
      </Typography>
      <div className={classes.markedH4Center}></div>

      {cards ?  <Listrealestate todos={cards} /> : <renderLoader />}

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
      >
        <AddIcon />
        {t("seeallitem.label")}
      </Button>
    </Container>
  );
}
