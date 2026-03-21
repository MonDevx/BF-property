import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useLocation } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Linkmu from "@material-ui/core/Link";
import { isMobile } from "react-device-detect";
import { AiOutlineHome, AiOutlineFieldTime } from "react-icons/ai";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(10),
    },
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
});

const useStyles = makeStyles(styles);

function Updatestatusproperty() {
  const classes = useStyles();
  const { t } = useTranslation();
  const alert = useAlert();
  const location = useLocation();

  const [id] = useState(location.state.id);
  const [status, setStatus] = useState(location.state.status);

  const handleSubmit = async (event) => {
    event.preventDefault();

    firestore
      .collection("property")
      .doc(id)
      .update({ status: status })
      .then(() => {
        alert.success(t("alertupdatestatuspropertysuccess.label"));
      })
      .catch((err) => {
        alert.error(t("alertupdatestatuspropertyerror.label"));
      });
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "4%", paddingBottom: "4%" }}
    >
      <Paper elevation={3} className={classes.paper}>
        <Grid container direction="row" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Linkmu
                color="inherit"
                component={Link}
                to="/my-property"
                className={classes.link}
              >
                <AiOutlineHome className={classes.icon} />
                {t("myproperty.name.label")}
              </Linkmu>

              <Typography color="textPrimary" className={classes.link}>
                <AiOutlineFieldTime className={classes.icon} />
                {t("updatestatuspropertybutton.label")}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={isMobile ? 6 : 4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                {t("updatestatusproperty.label")}
              </InputLabel>
              <Select
                name="sizefamily"
                onChange={handleChange}
                value={status}
                label={t("updatestatusproperty.label")}
              >
                <MenuItem value={1}>
                  {t("statuspropertytype1.label")}
                </MenuItem>
                <MenuItem value={2}>
                  {t("statuspropertytype2.label")}
                </MenuItem>
                <MenuItem value={3}>
                  {t("statuspropertytype3.label")}
                </MenuItem>
                <MenuItem value={4}>
                  {t("statuspropertytype4.label")}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={isMobile ? 6 : 3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              {t("updatestatuspropertybutton.label")}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Updatestatusproperty;
