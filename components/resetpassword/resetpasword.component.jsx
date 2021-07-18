import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { withAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth } from "../../firebase.utils.js";
import { withTranslation } from "next-i18next";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Image from 'next/image';
import undraw_my_password from '../../public/img/svg/Illustration/undraw_my_password_d6kg.svg'
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

class Resetpassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { t } = this.props;

    auth
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.props.alert.success(t("reset-password:alertresetpasswordemailsuccess"));
      })
      .catch((error) => {
        this.props.alert.error(error);
      });
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  render() {
    const { email } = this.state;
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <Container
        maxWidth="md"
        style={{ paddingTop: "4%", paddingBottom: "4%" }}
      >
        <Paper elevation={3} className={classes.paper}>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) =>
              this.props.alert.error(t("reset-password:updateinfoerror2.label"))
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
                <Image
                  alt=""
                  src={undraw_my_password}
                  style={{ width: "100%", height: "300px" }}
                ></Image>
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h2" className={classes.headertitle}>
                      {t("reset-password:forgetpasswordform.label")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      {t("reset-password:newpasswordrequired.label")}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      label={t("signin-signup:email.label")}
                      onChange={this.handleChange}
                      name="email"
                      value={email}
                      variant="outlined"
                      fullWidth
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        t("signin-signup:emailrequired.label"),
                        t("signin-signup:emailisEmail.label"),
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
                      {t("reset-password:resetpasswordbutton")}
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
}

export default compose(
  withTranslation(),
  withStyles(styles),
  withAlert()
)(Resetpassword);
