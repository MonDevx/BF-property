import React from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from '@material-ui/core/styles';
export default function ScrollTop(props) {
    const useStyles = makeStyles((theme) => ({
      root: {
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(4),
      },
    }));
    const { children, window } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });

    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      );

      if (anchor) {
        anchor.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    return (
      <Zoom in={trigger}>
        <div
          onClick={handleClick}
          role="presentation"
          className={classes.root}
        >
          {children}
        </div>
      </Zoom>
    );
  }
