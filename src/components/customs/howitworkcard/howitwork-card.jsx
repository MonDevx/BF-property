import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  number: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.background.paper,
    padding: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 150,
    margin: theme.spacing(4),
  },
  card: {
    padding: theme.spacing(3),
  },
}));
const defaultProps = {
  bgcolor: "primary.main",
  m: 1,
  style: { width: "2rem", height: "2rem" },
};
export const HowItWorkCard = (props) => {
  const classes = useStyles();
  const { number, headline, text, image } = props;
  return (
    <React.Fragment>
      <Card align="center" className={classes.card}>
        <Box borderRadius="50%" {...defaultProps}>
          <Typography
            variant="subtitle1"
            align="center"
            className={classes.number}
          >
            {number}
          </Typography>
        </Box>
        <LazyLoadImage
          alt="img3"
          src={process.env.PUBLIC_URL + image}
          className={classes.image}
          effect="blur"
        />
        <Typography variant="h5" align="center">
          {headline}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {text}
        </Typography>
      </Card>
    </React.Fragment>
  );
};
