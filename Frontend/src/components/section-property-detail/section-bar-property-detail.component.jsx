import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { useTranslation } from "react-i18next";
import {ChipStatus} from "../customs/chip-customs/chip-customs.jsx"

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    backgroundColor: "#3B3E4B",
    padding: theme.spacing(1),
  },
  toolbarItem: {
    color: theme.palette.common.white,
  },
}));

export default function Bar(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Toolbar
      component="nav"
      variant="dense"
      className={classes.toolbarSecondary}
    >
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Chip
    
              label={
                props.typeproperty === 1
                  ? t("typeproperty1.label")
                  : props.typeproperty === 2
                  ? t("typeproperty2.label")
                  : t("typeproperty3.label")
              }
            />
          </Grid>
          <Grid item>
            <ChipStatus  status={props.status}/>

          </Grid>
          <Grid item>
            <AccessTimeIcon fontSize="small" className={classes.toolbarItem} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" className={classes.toolbarItem}>
              {props.time}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Toolbar>
  );
}
