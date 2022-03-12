import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { withAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { auth } from "../../firebase/firebase.utils.js";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import withStyles from '@mui/styles/withStyles';
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
        this.props.alert.success(t("alertresetpasswordemailsuccess"));
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
              this.props.alert.error(t("updateinfoerror2.label"))
            }
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
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
                      onChange={this.handleChange}
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
}

export default compose(
  withTranslation(),
  withStyles(styles),
  withAlert()
)(Resetpassword);
