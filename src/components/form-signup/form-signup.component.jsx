import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import ReCAPTCHA from "react-google-recaptcha";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = (theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      valuecaptcha: "",
      emailcheck: false,
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {

    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (event.target.name === "emailcheck") {
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: value });
    }
  };

  onChange = (value) => {
    this.setState({ valuecaptcha: value });
  };
  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      valuecaptcha,
      emailcheck,
    } = this.state;
    const { classes, t } = this.props;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {t("signup.label")}
          </Typography>
          <Typography variant="subtitle2">{t("signupsub.label")}</Typography>
 
            <ValidatorForm onSubmit={this.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label={t("displayname.label")}
                    id="displayName"
                    onChange={this.handleChange}
                    name="displayName"
                    value={displayName}
                    validators={["required"]}
                    errorMessages={[t("displaynamerequired.label")]}className={classes.form}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextValidator
                    variant="outlined"
                    fullWidth
                    label={t("email.label")}
                    id="email"
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={emailcheck}
                        onChange={this.handleChange}
                        name="emailcheck"
                        color="primary"
                      />
                    }
                    label="รับการแจ้งเตือนข่าวสารทางอีเมล์"
                  />
                </Grid>
                <Grid item xs={12}>
                  <ReCAPTCHA
                    sitekey="6LcJ1P4UAAAAAIqRs0zN5lng511G53rXwWeTLFRg"
                    onChange={this.onChange}
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
}
SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withTranslation(), withStyles(useStyles))(SignUp);
