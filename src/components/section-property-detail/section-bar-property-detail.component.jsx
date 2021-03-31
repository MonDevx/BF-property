import Chip from "@material-ui/core/Chip";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HomeIcon from "@material-ui/icons/Home";
import React from "react";
import { useTranslation } from "react-i18next";
import {ChipStatus} from "../customs/chip-customs/chip-customs"
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
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Chip
              icon={<HomeIcon />}
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
