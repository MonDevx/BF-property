import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import React from "react";
import { withAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { compose } from "redux";
import { auth } from "../../firebase/firebase.utils.js";
import { withTranslation } from "react-i18next";
import withStyles from '@mui/styles/withStyles';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Linkui from "@mui/material/Link";
import { Link } from "react-router-dom";
import {  AiOutlineLock,AiOutlineUser} from 'react-icons/ai';
import {isMobile} from 'react-device-detect';
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
class Changepassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: "",
        repeatPassword: "",
      },
    };
  }
  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }
  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { t } = this.props;
    var user = auth.currentUser;

    user
      .updatePassword(this.state.user.password)
      .then(() => {
        this.props.alert.success(t('alertresetpasswordsuccess'));
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          this.props.alert.error(t('alertresetpassworderror'));
        } else {
          this.props.alert.error(error);
        }
      });
  };

  handleChange = (event) => {
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    const { t } = this.props;
    const { classes } = this.props;
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
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) =>
              this.props.alert.error(t("updateinfoerror2.label"))
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default compose(withTranslation(),withAlert(),withStyles(styles), connect(mapStateToProps))(Changepassword);
