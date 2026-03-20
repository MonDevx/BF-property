import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth } from "../../firebase/firebase.utils.js";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Linkui from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { isMobile } from "react-device-detect";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),
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

function Changepassword() {
  const classes = useStyles();
  const { t } = useTranslation();
  const alert = useAlert();

  const [user, setUser] = useState({
    password: "",
    repeatPassword: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      return value === user.password;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [user.password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentUser = auth.currentUser;

    currentUser
      .updatePassword(user.password)
      .then(() => {
        alert.success(t('alertresetpasswordsuccess'));
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert.error(t('alertresetpassworderror'));
        } else {
          alert.error(error);
        }
      });
  };

  const handleChange = (event) => {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "4%", paddingBottom: "4%" }}
    >
      <Paper
       elevation={3}
        className={classes.paper}
      >
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) =>
            alert.error(t("updateinfoerror2.label"))
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Linkui
                  color="inherit"
                  className={classes.link}
                  to="/profile"
                  component={Link}
                >
                  <AiOutlineUser className={classes.icon} />
                  {t("myacc.label")}
                </Linkui>

                <Typography color="textPrimary" className={classes.link}>
                <AiOutlineLock className={classes.icon} />
                {t("changepassword.label")}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom style={{ 'fontWeight': 'bold' }}>{t("resetpassword.label")}</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                label={t("newpassword.label")}
                onChange={handleChange}
                name="password"
                type="password"
                variant="outlined"
                validators={["required"]}
                errorMessages={[t("confirmnewpassword.label")]}
                value={user.password}
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                label={t("renewpassword.label")}
                onChange={handleChange}
                name="repeatPassword"
                type="password"
                variant="outlined"
                validators={["isPasswordMatch", "required"]}
                errorMessages={[
                  t("confirmnewpasswordisPasswordMatch.label"),
                  t("confirmnewpasswordrequired.label"),
                ]}
                value={user.repeatPassword}
              />
            </Grid>
            <Grid item xs={isMobile?8:4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="medium"
                startIcon={<SystemUpdateAltIcon />}
                disabled={user.password === "" || user.repeatPassword === ""}
              >
              {t("resetpasswordbutton")}
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Paper>
    </Container>
  );
}

export default Changepassword;
