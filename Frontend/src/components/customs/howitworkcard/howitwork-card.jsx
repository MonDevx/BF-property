import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  number: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.background.paper,
    padding: theme.spacing(0.85),
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  card: {
    padding: theme.spacing(3),
    height: 300,
  },
  content: {
    justifyContent: "space-between",
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
          <Typography variant="body2" align="center" className={classes.number}>
            {number}
          </Typography>
        </Box>

        <CardContent>
          <CardMedia
            component="img"
            className={classes.image}
            image={image}
            alt={text}
          />
          <Typography
            variant="subtitle1"
            fontWeight="fontWeightBold"
            align="center"
          >
            {headline}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
