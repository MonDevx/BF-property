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
import Link from 'next/link';
import { compose } from "redux";
import {
  auth,
  signInWithFacebook,
  signInWithGoogle,
} from "../../firebase.utils.js";
import { withTranslation } from "next-i18next";
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
    if (email != null && password != null) {
      try {
         await auth.signInWithEmailAndPassword(email, password);
     
        this.setState({ email: "", password: "" });
      } catch (error) {
        this.props.alert.error(t("error.sigin.label"));
      }
    }
  };
  handleSignInWithGoogle = async () => {
    const message = await signInWithGoogle();
    if (message) {
      this.props.alert.error(message);
    }

  };
  handleSignInWithFacebook = async () => {
    const message = await signInWithFacebook();
    if (message) {
      this.props.alert.error(message);
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
          {t("signin-signup:sigin.label")}
        </Typography>
        <Typography variant="subtitle2">{t("signin-signup:siginsub.label")}</Typography>

        <ValidatorForm
          ref="form"
          onSubmit={this.handleSubmit}
          //onError={(errors) => console.log(errors)}
          className={classes.form}
        >
          <TextValidator
            variant="outlined"
            fullWidth
            label={t("signin-signup:email.label")}
            onChange={this.handleChange}
            name="email"
            value={email}
            validators={["required", "isEmail"]}
            errorMessages={[t("signin-signup:emailrequired.label"), t("signin-signup:emailisEmail.label")]}
          />
          <TextValidator
            type="password"
            variant="outlined"
            label={t("signin-signup:password.label")}
            margin="normal"
            fullWidth
            onChange={this.handleChange}
            name="password"
            value={password}
            validators={["required"]}
            errorMessages={[t("signin-signup:passwordrequired.label")]}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("signin-signup:remeberme.label")}
          />
          <Button
            type="submit"
            variant="contained"
            color="default"
            className={classes.submit}
            fullWidth
            size="large"
          >
            {t("signin-signup:sigin.label")}
          </Button>
        </ValidatorForm>
        <Grid container>
          <Grid item xs>
            <Link href="/reset-password" passHref> 
              <Linkui variant="body2">
                {t("signin-signup:forgetpassword.label")}
              </Linkui>
            </Link>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          size="large"
          onClick={this.handleSignInWithFacebook}
        >
          <FacebookIcon style={{ marginRight: 5 }} />
          {t("signin-signup:facbook.label")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#DB4437" }}
          fullWidth
          className={classes.submit}
          size="large"
          onClick={this.handleSignInWithGoogle}
        >
          <FontAwesomeIcon
            style={{ marginRight: 5 }}
            icon={["fab", "google"]}
            size="xl"
          />

          {t("signin-signup:google.label")}
        </Button>
      </Container>
    );
  }
}


export default compose(
  withTranslation(),
  withAlert(),
  withStyles(useStyles)
)(SignIn);
