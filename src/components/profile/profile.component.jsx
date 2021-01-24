/* eslint-disable no-lone-blocks */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
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
  /* and all your other styles ... */
});
     {/* TODO  FUNCTION ADD/UPDATE IMAGE USER*/}
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: this.props.currentUser,
    };
  }

  render() {
    let {
      displayName,
      email,
      lastSignInTime,
      photoURL,
      birthday,
      gender,
      phone,
    } = this.state.User;
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
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4">{t("myacc.label")}</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                color="secondary"
                style={{ backgroundColor: "#ff9700" }}
                component={Link}
                to={{
                  pathname: "profile/edit-profile",
                }}
              >
                {t("editinformation.label")}
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                startIcon={<LockRoundedIcon />}
                variant="contained"
                color="secondary"
                component={Link}
                to={{
                  pathname: "profile/changepassword",
                }}
              >
                {t("changepassword.label")}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Avatar
                src={photoURL}
                variant="rounded"
                style={{ height: "150px", width: "150px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">{t("info.label")}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("displayname.label")}
                {" : "}
                {displayName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("email.label")}
                {" : "}
                {email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("phone.label")}
                {" : "}
                {phone ? phone : t("infoemty.label")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("sex.label")}
                {" : "}
                {gender === 1
                  ? t("typesex1.label")
                  : gender === 2
                  ? t("typesex2.label")
                  : gender === 3
                  ? t("typesex3.label")
                  : t("infoemty.label")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("birthday.label")}
                {" : "}
                {birthday ? birthday : t("infoemty.label")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                {t("lasttimesignin.label")}
                {" : "}
                {lastSignInTime}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default compose(withTranslation(),withStyles(styles), connect(mapStateToProps))(Profile);
