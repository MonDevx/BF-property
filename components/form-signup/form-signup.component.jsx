import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth, createUserProfileDocument } from "../../firebase.utils";
import ReCAPTCHA from "react-google-recaptcha";
import { withTranslation } from "next-i18next";
import { compose } from "redux";
import { withAlert } from "react-alert";
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
      this.props.alert.error(error);
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
    } = this.state;
    const { classes, t } = this.props;

    return (
      <React.Fragment>
        <Container component="main" maxWidth="xs">
          <Typography component="h1" variant="h5">
            {t("signin-signup:signup.label")}
          </Typography>
          <Typography variant="subtitle2">{t("signin-signup:signupsub.label")}</Typography>

          <ValidatorForm onSubmit={this.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label={t("signin-signup:displayname.label")}
                  id="displayName"
                  onChange={this.handleChange}
                  name="displayName"
                  value={displayName}
                  validators={["required"]}
                  errorMessages={[t("signin-signup:displaynamerequired.label")]}
                  className={classes.form}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label={t("signin-signup:email.label")}
                  id="email"
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("signin-signup:emailrequired.label"),
                    t("signin-signup:emailisEmail.label"),
                  ]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label={t("signin-signup:password.label")}
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  validators={["required"]}
                  errorMessages={[t("signin-signup:passwordrequired.label")]}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  variant="outlined"
                  label={t("signin-signup:confirmPassword.label")}
                  fullWidth
                  onChange={this.handleChange}
                  name="confirmPassword"
                  type="password"
                  validators={["required", "isPasswordMatch"]}
                  errorMessages={[
                    t("signin-signup:confirmPasswordrequired.label"),
                    t("signin-signup:confirmPasswordisPasswordMatch.label"),
                  ]}
                  value={confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA}
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
              {t("signin-signup:buttonsignup.label")}
            </Button>
          </ValidatorForm>
          <Grid item>
            <Typography>
              {t("signin-signup:signupdetail.label")}
              <Link
                component={RouterLink}
                variant="body2"
                target="_blank"
                to="/termsandcondition"
              >
                {t("signin-signup:signupsubdetail.label")}
              </Link>
            </Typography>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
// SignUp.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default compose(withTranslation(), withAlert(), withStyles(useStyles))(SignUp);
