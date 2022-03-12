import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Grid from "@mui/material/Grid";
export default function LoaderSpinners() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <ClipLoader size={45} color={"#007BFF"} />
    </Grid>
  );
}
