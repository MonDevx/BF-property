import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import React from "react";
import { withAlert } from "react-alert";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link as RouterLink } from "react-router-dom";
import { compose } from "redux";
import axios from "axios";
import { withTranslation } from "react-i18next";
import Chip from "@material-ui/core/Chip";
const styles = (theme) => ({
  footer: {
    background:
      "linear-gradient(165.96deg, rgba(35, 56, 135, 0.95) 29.9%, rgba(8, 172, 145, 0.95) 104.77%)",
    padding: theme.spacing(5),
  },
  texthead: {
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  textsub: {
    color: theme.palette.common.white,
  },

  markedH4Center: {
    height: 3,
    width: "100%",
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: "#E5E5E5",
    marginTop: "4.5%",
  },
  icon: {
    position: "relative",
    top: theme.spacing(1),
    marginRight: 5,
  },
});
const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextValidator);
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      disable: false,
    };
  }

  handleChange = (event) => {
    const email = event.target.value;
    this.setState({ email: email });
  };

  handleSubmit = () => {
    this.setState({ disable: true });
    axios({
      method: "POST",
      url: `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/subscribe`,
      data: {
        email: this.state.email,
      },
    })
      .then((res) => {
        console.log(res);
        this.props.alert.success("การกดรับการแจ้งเตือนข่าวสารสำเร็จ");
      })
      .catch((err) => {
        this.props.alert.error("การกดรับการแจ้งเตือนข่าวสารเกิดข้อผิดผลาด");
        this.setState({ disable: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { email } = this.state;
    const { t } = this.props;
    return (
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                className={classes.texthead}
              >
                {t("footerheadertag.label")}
              </Typography>
              <Chip
                variant="default"
                size="small"
                label={t("typeproperty1.label")}
              />
              <Chip
                variant="default"
                size="small"
                label={t("typeproperty2.label")}
              />
              <Chip variant="default" size="small" label={t("footer.tag1")} />
              <Chip variant="default" size="small" label={t("footer.tag2")} />
              <Chip variant="default" size="small" label={t("footer.tag3")} />
              <Chip variant="default" size="small" label={t("footer.tag4")} />
              <Chip variant="default" size="small" label={t("footer.tag5")} />
            </Grid>
            <Grid item xs>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                className={classes.texthead}
              >
                {t("problemheader.label")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="inherit"
                component="p"
                className={classes.textsub}
              >
                <LocationOnIcon className={classes.icon} />
                {t("location.label")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="inherit"
                className={classes.textsub}
              >
                <EmailIcon className={classes.icon} />
                {"noreplybfproperty@gmail.com"}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                className={classes.texthead}
              >
                {t("about.label")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                component="p"
                className={classes.textsub}
              >
                {t("aboutdetail.label")}
              </Typography>
              {/* TODO  FIX FACEBOOK PAGE NOT LOAD */}
              <div
                className="fb-page"
                data-href="https://www.facebook.com/BFproperty-103720534694768"
                data-hide-cover="false"
                data-show-facepile="false"
                data-width="270"
                data-height="400"
                style={{ paddingTop: "3%" }}
              >
                <blockquote
                  cite="https://www.facebook.com/BFproperty-103720534694768"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/BFproperty-103720534694768">
                    BFproperty
                  </a>
                </blockquote>
              </div>
            </Grid>

            <Grid item xs>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                className={classes.texthead}
              >
                {t("follow.label")}
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                gutterBottom
                className={classes.textsub}
              >
                {t("followdetail.label")}
              </Typography>

              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={(errors) => console.log(errors)}
              >
                <CssTextField
                  id="email"
                  fullWidth
                  variant="outlined"
                  label={t("followemail.label")}
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    t("emailrequired.label"),
                    t("emailisEmail.label"),
                  ]}
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  color=""
                  style={{ marginTop: 10 }}
                  type="submit"
                  disabled={this.state.disable}
                >
                  {t("followsubmit.label")}
                </Button>
              </ValidatorForm>
            </Grid>
          </Grid>
          <div className={classes.markedH4Center}></div>
          <div className={classes.textsub} style={{ marginTop: "1%" }}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="baseline"
            >
              <Link component={RouterLink} to="/termsandcondition">
                <Typography
                  variant="subtitle2"
                  color="inherit"
                  className={classes.textsub}
                >
                  {t("terms.label")}
                </Typography>
              </Link>
              <Typography variant="body2" color="inherit">
                {t("copyright.label")}
                BFproperty {new Date().getFullYear()}
                {"."}
              </Typography>
            </Grid>
          </div>
        </Container>
      </footer>
    );
  }
}

export default compose(
  withTranslation(),
  withAlert(),
  withStyles(styles)
)(Footer);
