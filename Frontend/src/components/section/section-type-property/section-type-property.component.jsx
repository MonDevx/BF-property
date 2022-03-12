import Container from "@mui/material/Container";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";
import React from "react";
import Buttonbase from "../../customs/ิีbuttonbase/buttonbase.component.jsx";
import { useTranslation } from "react-i18next";

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
  headertitle: {
    fontWeight: "bold",
  },
}));

export default function Sectiontypeproperty() {
  const classes = useStyles();
  const { t } = useTranslation();
  const images = [
    {
      urljpg: "./assets/img/jpg/typehouse-main/Singlehouse.jpg",
      urlwebp: "./assets/img/webp/typehouse-main/Singlehouse.webp",
      title: t("typeproperty1.label"),
      value: "บ้านเดี่ยว",
      width: "48%",
      height: "200px",
      credit: "Photo by Ralph Kayden on Unsplash",
    },
    {
      urljpg: "./assets/img/jpg/typehouse-main/Townhouse.jpg",
      urlwebp: "./assets/img/webp/typehouse-main/Townhouse.webp",
      title: t("typeproperty2.label"),
      value: "บ้านเทาว์เฮาส์",
      width: "48%",
      height: "200px",
      credit: "Photo by Derrick Brooks on Unsplash",
    },
  ];
  return (
    <div className={classes.content}>
    <Container className={classes.cardGrid} maxWidth="lg">
      <Typography
        variant="h4"
        align="center"
        className={classes.headertitle}
        color="primary"
      >
        {t("typeheader.label")}
      </Typography>

      <div style={{ marginTop: 15 }}>
        <Buttonbase images={images} />
      </div>
    </Container></div>
  );
}
