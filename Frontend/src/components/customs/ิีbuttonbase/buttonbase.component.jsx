import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { isWebpSupported } from "react-image-webp/dist/utils";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import qs from 'query-string';
const useStyles = makeStyles((theme) => ({
  image: {
    position: "relative",

    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },

  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6
      }px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
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
export default function Buttonbase(props) {
  const classes = useStyles();
  const { handleNext } = props;
  const location = useLocation();
  return (
    <React.Fragment>
      {props.images.map((image, index) => (
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Credit photo</Typography>
              {image.credit}
            </React.Fragment>
          }
          key={index}
        >
          {location.pathname === "/" ? (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
                height: image.height,
                margin: 5,
              }}
              component={Link}
              to={{
                pathname: "/seach-result",
                search: qs.stringify({
                  seachkey: image.value,

                }),
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${isWebpSupported() ? image.urlwebp : image.urljpg
                    })`,
                }}
              />

              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ) : (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
                margin: 5,
              }}
              onClick={() => handleNext(index + 1)}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${isWebpSupported() ? image.urlwebp : image.urljpg
                    })`,
                }}
              />

              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          )}
        </HtmlTooltip>
      ))
      }
    </React.Fragment >
  );
}
