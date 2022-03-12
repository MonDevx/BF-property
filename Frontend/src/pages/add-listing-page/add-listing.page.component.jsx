import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import Addlisting from "../../components/add-listing/add-listing.component.jsx";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  }
}));
export default function AddlistingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Addlisting />
    </div>
  );
}
