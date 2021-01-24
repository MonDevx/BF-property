import Typography from "@material-ui/core/Typography";
import React from "react";
import Buttonbase from "../ิีbuttonbase/buttonbase.component.jsx";
import { useTranslation } from "react-i18next";
export default function HousetypeForm(props) {
  const { handleNext } = props;
  const { t } = useTranslation();
  const images = [
    {
      urljpg: "./assets/img/type-house/type-house-img1.jpg",
      urlwebp: "./assets/img/webp/type-house/type-house-img1.webp",
      title: t("typehouse1.label"),
      width: "30%",
      credit: "Photo by Ralph Kayden on Unsplash",
    },
    {
      urljpg: "./assets/img/type-house/type-house-img2.jpg",
      urlwebp: "./assets/img/webp/type-house/type-house-img2.webp",
      title:t("typehouse2.label"),
      width: "30%",
      credit: "Photo by Derrick Brooks on Unsplash",
    },
    {
      urljpg: "./assets/img/type-house/type-condo.jpg",
      urlwebp: "./assets/img/webp/type-house/type-condo.webp",
      title: t("typehouse3.label"),
      width: "30%",
      credit: "Photo by Wes Hicks on Unsplash",
    },
  ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {t('typehouseheader.label')}
      </Typography>
      <Buttonbase images={images} handleNext={handleNext} />
    </React.Fragment>
  );
}
