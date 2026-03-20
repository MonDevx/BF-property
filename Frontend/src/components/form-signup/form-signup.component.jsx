import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

const styles = (theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const useStyles = makeStyles(styles);

function SignUp() {
  const classes = useStyles();
  const { t } = useTranslation();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valuecaptcha, setValuecaptcha] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      return value === password;
    });
    return () => {
      ValidatorForm.removeValidationRule("isPasswordMatch");
    };
  }, [password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name === "emailcheck") {
      if (name === "displayName") setDisplayName(checked);
      else if (name === "email") setEmail(checked);
    } else {
      if (name === "displayName") setDisplayName(value);
      else if (name === "email") setEmail(value);
      else if (name === "password") setPassword(value);
      else if (name === "confirmPassword") setConfirmPassword(value);
    }
  };

  const onChange = (value) => {
    setValuecaptcha(value);
  };

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          {t("signup.label")}
        </Typography>
        <Typography variant="subtitle2">{t("signupsub.label")}</Typography>

        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                label={t("displayname.label")}
                id="displayName"
                onChange={handleChange}
                name="displayName"
                value={displayName}
                validators={["required"]}
                errorMessages={[t("displaynamerequired.label")]}
                className={classes.form}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                label={t("email.label")}
                id="email"
                onChange={handleChange}
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={[
                  t("emailrequired.label"),
                  t("emailisEmail.label"),
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                fullWidth
                label={t("password.label")}
                onChange={handleChange}
                name="password"
                type="password"
                validators={["required"]}
                errorMessages={[t("passwordrequired.label")]}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                label={t("confirmPassword.label")}
                fullWidth
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                validators={["required", "isPasswordMatch"]}
                errorMessages={[
                  t("confirmPasswordrequired.label"),
                  t("confirmPasswordisPasswordMatch.label"),
                ]}
                value={confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <ReCAPTCHA
                sitekey={process.env.REACT_APPP_RECAPTCHA}
                onChange={onChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
            disabled={valuecaptcha === ""}
          >
            {t("buttonsignup.label")}
          </Button>
        </ValidatorForm>
        <Grid item>
          <Typography>
            {t("signupdetail.label")}
            <Link
              component={RouterLink}
              variant="body2"
              target="_blank"
              to="/termsandcondition"
            >
              {t("signupsubdetail.label")}
            </Link>
          </Typography>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default SignUp;
