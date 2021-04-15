/* eslint-disable no-lone-blocks */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import {
  AiOutlineCloudUpload,
  AiOutlineCamera,
  AiOutlineEdit,
  AiOutlineLock,
} from "react-icons/ai";
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
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  input: {
    display: "none",
  },
  headertitle: {
    fontWeight: "bold",
  },
});
{
  /* TODO  FUNCTION ADD/UPDATE IMAGE USER*/
}
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User: this.props.currentUser,
      selectedFiles: undefined,
    };
  }

  render() {
    const { selectedFiles, User } = this.state;
    let {
      displayName,
      email,
      lastSignInTime,
      photoURL,
      birthday,
      gender,
      phone,
    } = User;
    const { t } = this.props;
    const { classes } = this.props;
    const selectFile = (event) => {
      this.setState({
        selectedFiles: event.target.files,
      });
    };
    return (
      <Container
        maxWidth="md"
        style={{ paddingTop: "4%", paddingBottom: "4%" }}
      >
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.headertitle}>
                {displayName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                startIcon={<AiOutlineEdit />}
                variant="outlined"
                color="secondary"
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
                startIcon={<AiOutlineLock />}
                variant="outlined"
                color="secondary"
                component={Link}
                to={{
                  pathname: "profile/changepassword",
                }}
              >
                {t("changepassword.label")}
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Paper elevation={0} style={{ backgroundColor: "#fafafa" }}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <Avatar src={photoURL} className={classes.large} />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      onChange={selectFile}
                      type="file"
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="outlined"
                        color="primary"
                        component="span"
                        endIcon={<AiOutlineCamera />}
                      >
                        เลือกรูปภาพ
                      </Button>
                    </label>
                  </Grid>
                  {selectedFiles && selectedFiles.length > 0 ? (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2">
                          {selectedFiles[0].name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          color="primary"
                          component="span"
                          endIcon={<AiOutlineCloudUpload />}
                        >
                          อัพโหลด
                        </Button>
                      </Grid>
                    </React.Fragment>
                  ) : null}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={7}>
              <Grid
                container
                direction="column"
                justify="space-between"
                spacing={3}
              >
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
              </Grid>
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
export default compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps)
)(Profile);
