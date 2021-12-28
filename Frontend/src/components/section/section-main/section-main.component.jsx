import Container from "@material-ui/core/Container";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { isWebpSupported } from "react-image-webp/dist/utils";
import Formseach from "../../form-seach/form-seach.component.jsx";
import { useTranslation } from "react-i18next";
import "./videoBackground.css";
import video from "../../../assets/video_home.webm"
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    overflow: "hidden",
    zIndex: -1,
  },
  content: {
    padding: theme.spacing(8, 0, 6),

    backgroundColor: "rgba(0,0,0,.25)",
  },
  text: {
    color: theme.palette.common.white,
  },
}));


export default function Sectionrecommend() {
  const classes = useStyles();
  const { t } = useTranslation()
  return (
    <React.Fragment>

      <div className={classes.root}>
        <video className="video-background"  autoPlay loop muted>
          <source
            src={video}
            type="video/webm"
          />
        </video>
      </div>



      <div className={classes.content}>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" className={classes.text}>
            {t("mainheader.label")}
          </Typography>
          <Typography variant="h3" align="center" className={classes.text}>
            {t("mainsubheader.label")}
          </Typography>
        </Container>
        <Formseach />
      </div>
    </React.Fragment>
    /* <div className={classes.content}>
        <Container maxWidth="sm">
          <Typography variant="h2" align="center" className={classes.text}>
            {t("mainheader.label")}
          </Typography>
          <Typography variant="h3" align="center" className={classes.text}>
            {t("mainsubheader.label")}
          </Typography>
        </Container>
        <Formseach />
      </div> */
  );
}
