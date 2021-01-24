import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Buttonbase from "../../ิีbuttonbase/buttonbase.component.jsx";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  }
}));

export default function Sectiontypeproperty() {
  const classes = useStyles();
  const { t } = useTranslation();
  const images = [
  {
    urljpg: process.env.PUBLIC_URL + "/assets/img/jpg/typehouse-main/Singlehouse.jpg",
    urlwebp: process.env.PUBLIC_URL + "/assets/img/webp/typehouse-main/Singlehouse.webp",
    title: t("typehouse1.label"),
    value:1,
    width: "48%",
    height:"200px",
    credit: "Photo by Ralph Kayden on Unsplash",
  },
  {
    urljpg: process.env.PUBLIC_URL + "/assets/img/jpg/typehouse-main/Townhouse.jpg",
    urlwebp:process.env.PUBLIC_URL +  "/assets/img/webp/typehouse-main/Townhouse.webp",
    title: t("typehouse2.label"),
    value:2,
    width: "48%",
    height:"200px",
    credit: "Photo by Derrick Brooks on Unsplash",
  },
];
  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Typography variant="h4" align="center" color="primary">
      {t("typeheader.label")}
      </Typography>

      <div style={{ marginTop: 15 }}>
         <Buttonbase images={images}/>
      </div>
    </Container>
  );
}
