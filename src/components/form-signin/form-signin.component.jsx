import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Linkui from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import FacebookIcon from "@material-ui/icons/Facebook";
import PropTypes from "prop-types";
import React from "react";
import { withAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import { compose } from "redux";
import {
  auth,
  signInWithFacebook,
  signInWithGoogle,
} from "../../firebase/firebase.utils.js";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);
const useStyles = (theme) => ({
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
class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { t } = this.props;
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      this.props.alert.error(t("error.sigin.label"));
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };
  render() {
    const { email, password } = this.state;
    const { classes, t } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          {t("sigin.label")}
        </Typography>
        <Typography variant="subtitle2">{t("siginsub.label")}</Typography>

        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          onError={(errors) => console.log(errors)}
          className={classes.form}
        >
          <TextValidator
            variant="outlined"
            fullWidth
            label={t("email.label")}
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withTranslation(),
  withAlert(),
  withStyles(useStyles)
)(SignIn);
