import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth } from "../../firebase/firebase.utils.js";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

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
  headertitle: {
    fontWeight: "bold",
  },
});

const useStyles = makeStyles(styles);

function Resetpassword() {
  const classes = useStyles();
  const { t } = useTranslation();
  const alert = useAlert();

  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert.success(t("alertresetpasswordemailsuccess"));
      })
      .catch((error) => {
        alert.error(error);
      });
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: "4%", paddingBottom: "4%" }}
    >
      <Paper elevation={3} className={classes.paper}>
        <ValidatorForm
          onSubmit={handleSubmit}
          onError={(errors) =>
            alert.error(t("updateinfoerror2.label"))
          }
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item xs={6}>
              <img
                alt=""
                src="./assets/img/svg/Illustration/undraw_my_password_d6kg.svg"
                width="100%"
                height="300px"
              ></img>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h2" className={classes.headertitle} >
                    {t("forgetpasswordform.label")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {t("newpasswordrequired.label")}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    label={t("email.label")}
                    onChange={handleChange}
                    name="email"
                    value={email}
                    variant="outlined"
                    fullWidth
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      t("emailrequired.label"),
                      t("emailisEmail.label"),
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {t("resetpasswordbutton")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Paper>
    </Container>
  );
}

export default Resetpassword;
