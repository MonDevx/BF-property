import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Buttonbase from "../../customs/ิีbuttonbase/buttonbase.component.jsx";

import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  headertitle: {
    fontWeight: "bold",
  },
}));

export default function Sectioncontry() {
  const classes = useStyles();
  const { t } = useTranslation();
  const images = [
    {
      urljpg: "./assets/img/contry/bangkok.jpg",
      urlwebp: "./assets/img/webp/contry/bangkok.webp",
      title: t("contry1.label"),
      value: "กรุงเทพมหานคร",
      width: "98.5%",
      credit: "Photo by Andreas Brücker on Unsplash",
    },
    {
      urljpg: "./assets/img/contry/chiangmai.jpg",
      urlwebp: "./assets/img/webp/contry/chiangmai.webp",
      title: t("contry2.label"),
      value: "เชียงใหม่",
      width: "40%",
      credit: "Photo by Alex Harmuth on Unsplash",
    },
    {
      urljpg: "./assets/img/contry/rayong.jpg",
      urlwebp: "./assets/img/webp/contry/rayong.webp",
      title: t("contry3.label"),
      value: "ระยอง",
      width: "27%",
      credit: "Photo by Blackie BKK on Unsplash",
    },
    {
      urljpg: "./assets/img/contry/chonburi.jpg",
      urlwebp: "./assets/img/webp/contry/chonburi.webp",
      title: t("contry4.label"),
      value: "ชลบุรี",
      width: "30%",
      credit: "Photo by Jech on Unsplash",
    },
  ];
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Typography variant="h5" className={classes.headertitle}>
        {t("header.label")}{" "}
      </Typography>
      <Typography variant="h4" color="primary" className={classes.headertitle}>
        {t("subheader.label")}
      </Typography>

      <div style={{ marginTop: 15 }}>
        <Buttonbase images={images} />
      </div>
    </Container>
  );
}
