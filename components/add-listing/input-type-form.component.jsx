import Typography from "@material-ui/core/Typography";
import React from "react";
import Buttonbase from "../customs/ิีbuttonbase/buttonbase.component.jsx";
import { useTranslation } from "next-i18next";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  headertitle: {
    fontWeight: "bold",
  },
}));
export default function PropertyTypeForm(props) {

  const { handleNext } = props;
  const { t } = useTranslation();
  const images = [
    {
      urljpg: "/img/jpg/type-house/type-house-img1.jpg",
      urlwebp: "/img/webp/type-house/type-house-img1.webp",
      title: t("typeproperty1.label"),
      width: "30%",
      credit: "Photo by Ralph Kayden on Unsplash",
    },
    {
      urljpg: "/img/jpg/type-house/type-house-img2.jpg",
      urlwebp: "/img/webp/type-house/type-house-img2.webp",
      title: t("typeproperty2.label"),
      width: "30%",
      credit: "Photo by Derrick Brooks on Unsplash",
    },
    {
      urljpg: "/img/jpg/type-house/type-condo.jpg",
      urlwebp: "/img/webp/type-house/type-condo.webp",
      title: t("typeproperty3.label"),
      width: "30%",
      credit: "Photo by Wes Hicks on Unsplash",
    },
  ];
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.headertitle}>
        {t('typepropertyheader.label')}
      </Typography>
      <Buttonbase images={images} handleNext={handleNext} />
    </React.Fragment>
  );
}
