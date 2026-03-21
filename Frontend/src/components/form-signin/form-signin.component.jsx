import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Linkui from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import FacebookIcon from "@material-ui/icons/Facebook";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import {
  auth,
  signInWithFacebook,
  signInWithGoogle,
} from "../../firebase/firebase.utils.js";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

const styles = (theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
});

const useStyles = makeStyles(styles);

function SignIn() {
  const classes = useStyles();
  const { t } = useTranslation();
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert.error(t("error.sigin.label"));
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        {t("sigin.label")}
      </Typography>
      <Typography variant="subtitle2">{t("siginsub.label")}</Typography>

      <ValidatorForm
        onSubmit={handleSubmit}
        onError={(errors) => console.log(errors)}
        className={classes.form}
      >
        <TextValidator
          variant="outlined"
          fullWidth
          label={t("email.label")}
          onChange={handleChange}
          name="email"
          value={email}
          validators={["required", "isEmail"]}
          errorMessages={[t("emailrequired.label"), t("emailisEmail.label")]}
        />
        <TextValidator
          type="password"
          variant="outlined"
          label={t("password.label")}
          margin="normal"
          fullWidth
          onChange={handleChange}
          name="password"
          value={password}
          validators={["required"]}
          errorMessages={[t("passwordrequired.label")]}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label={t("remeberme.label")}
        />
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submit}
          fullWidth
          size="large"
        >
          {t("sigin.label")}
        </Button>
      </ValidatorForm>
      <Grid container>
        <Grid item xs>
          <Linkui component={Link} to="/resetpassword" variant="body2">
            {t("forgetpassword.label")}
          </Linkui>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        className={classes.submit}
        size="large"
        onClick={signInWithFacebook}
      >
        <FacebookIcon style={{ marginRight: 5 }} />
        {t("facbook.label")}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ backgroundColor: "#DB4437" }}
        fullWidth
        className={classes.submit}
        size="large"
        onClick={signInWithGoogle}
      >
        <FontAwesomeIcon
          style={{ marginRight: 5 }}
          icon={["fab", "google"]}
          size="xl"
        />

        {t("google.label")}
      </Button>
    </Container>
  );
}

export default SignIn;
