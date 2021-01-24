import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import React from "react";
import { withAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestore } from "../../firebase/firebase.utils";
import { withTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Linkui from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";
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
class Editprofile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: this.props.currentUser,
    };
  }

  handleSubmit = async (event) => {
    const { t } = this.props;
    event.preventDefault();
    let { User } = this.state;
    try {
      firestore
        .collection("users")
        .doc(User.id)
        .update(User)
        .then(() => {
          this.props.alert.success(t("updateinfosuccess.label"));
        });
    } catch (err) {
      this.props.alert.error(t("updateinfoerror.label"));
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "gender") {
      this.setState({ User: { ...this.state.User, [name]: Number(value) } });
    } else {
      this.setState({ User: { ...this.state.User, [name]: value } });
    }
  };
  render() {
    let { User } = this.state;
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <Container
        maxWidth="md"
        style={{ paddingTop: "4%", paddingBottom: "4%" }}
      >
        <Paper className={classes.paper} elevation={3}>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) =>
              this.props.alert.error(t("updateinfoerror2.label"))
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  <Linkui
                    color="inherit"
                    className={classes.link}
                    to="/profile"
                    component={Link}
                  >
                    <AccountBoxIcon className={classes.icon} />
                    {t("myacc.label")}
                  </Linkui>

                  <Typography color="textPrimary" className={classes.link}>
                    <EditIcon className={classes.icon} />
                    {t("editinformation.label")}
                  </Typography>
                </Breadcrumbs>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">{t("info.label")}</Typography>
              </Grid>

              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  fullWidth
                  label={t("displayname.label")}
                  onChange={this.handleChange}
                  name="displayName"
                  value={User.displayName}
                  validators={["required"]}
                  errorMessages={t("displaynamerequired.label")}
                />
              </Grid>
              <Grid item xs={6}>
                <PhoneInput
                  name="phone"
                  country={"th"}
                  value={User.phone}
                  specialLabel={t("phone.label")}
                  inputStyle={{
                    fontFamily: "prompt",
                    height: "55px",
                  }}
                  containerStyle={{
                    fontFamily: "prompt",
                  }}
                  disableDropdown={true}
                  defaultErrorMessage={t("phonerequired.label")}
                  onChange={(phone) =>
                    this.setState({
                      User: { ...this.state.User, phone: phone },
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{t("sex.label")}</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    value={User.gender ? User.gender : 1}
                    onChange={this.handleChange}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label={t("typesex1.label")}
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label={t("typesex2.label")}
                    />
                    <FormControlLabel
                      value={3}
                      control={<Radio />}
                      label={t("typesex3.label")}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextValidator
                  variant="outlined"
                  type="date"
                  fullWidth
                  label={t("birthday.label")}
                  onChange={this.handleChange}
                  name="birthday"
                  value={User.birthday}
                  validators={["required"]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  errorMessages={[t("birthdayrequired.label")]}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<SystemUpdateAltIcon />}
                  style={{ backgroundColor: "#55aa54" }}
                  disabled={
                    JSON.stringify(User) ===
                    JSON.stringify(this.props.currentUser)
                      ? true
                      : false
                  }
                >
                  {t("updateinfobutton.label")}
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
export default compose(
  withTranslation(),
  withAlert(),
  withStyles(styles),
  connect(mapStateToProps)
)(Editprofile);
