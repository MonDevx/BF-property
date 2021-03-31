import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { isWebpSupported } from "react-image-webp/dist/utils";
import Formseach from "../../form-seach/form-seach.component.jsx";
import { useTranslation } from "react-i18next";
const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage: `url(${
      isWebpSupported()
        ?process.env.PUBLIC_URL +  "/assets/img/webp/section/section-main-img.webp"
        :process.env.PUBLIC_URL +  "/assets/img/section/section-main-img.jpg"
    })`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  content: {
    padding: theme.spacing(8, 0, 6),

    backgroundColor: "rgba(0,0,0,.5)",
  },
  text: {
    color: theme.palette.common.white,
    
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

export default function Sectionrecommend() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color="inherit">Credit photo</Typography>
          {"Photo by Daniel DiNuzzo on Unsplash"}
        </React.Fragment>
      }
    >
      <div className={classes.heroContent}>
        <div className={classes.content}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              className={classes.text}
        
            >
            {t("mainheader.label")}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              className={classes.text}
            >
            {t("mainsubheader.label")}
            </Typography>
          </Container>
          <Formseach />
        </div>
      </div>
    </HtmlTooltip>
  );
}
