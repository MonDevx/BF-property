import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";
import { withAlert } from "react-alert";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { firestore } from "../../firebase/firebase.utils";
import { withTranslation } from "react-i18next";
import withStyles from '@mui/styles/withStyles';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Linkmu from "@mui/material/Link";
import { isMobile } from "react-device-detect";
import { AiOutlineHome, AiOutlineFieldTime } from "react-icons/ai";
const styles = (theme) => ({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1),
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
class Updatestatusproperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      status: this.props.location.state.status,
    };
  }

  handleSubmit = async (event) => {
    const { t } = this.props;
    event.preventDefault();

    firestore
      .collection("property")
      .doc(this.state.id)
      .update({ status: this.state.status })
      .then(() => {
        this.props.alert.success(t("alertupdatestatuspropertysuccess.label"));
      })
      .catch((err) => {
        this.props.alert.success(t("alertupdatestatuspropertyerror.label"));
      });
  };

  handleChange = (event) => {
    this.setState({ status: event.target.value });
  };

  render() {
    const { t } = this.props;
    const { classes } = this.props;
    return (
      <Container
        maxWidth="md"
        style={{ paddingTop: "4%", paddingBottom: "4%" }}
      >
        <Paper elevation={3} className={classes.paper}>
          <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Linkmu
                  color="inherit"
                  component={Link}
                  to="/my-property"
                  className={classes.link}
                >
                  <AiOutlineHome className={classes.icon} />
                  {t("myproperty.name.label")}
                </Linkmu>

                <Typography color="textPrimary" className={classes.link}>
                  <AiOutlineFieldTime className={classes.icon} />
                  {t("updatestatuspropertybutton.label")}
                </Typography>
              </Breadcrumbs>
            </Grid>
            <Grid item xs={isMobile ? 6 : 4}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  {t("updatestatusproperty.label")}
                </InputLabel>
                <Select
                  name="sizefamily"
                  onChange={this.handleChange}
                  value={this.state.status}
                  label={t("updatestatusproperty.label")}
                >
                  <MenuItem value={1}>
                    {t("statuspropertytype1.label")}
                  </MenuItem>
                  <MenuItem value={2}>
                    {t("statuspropertytype2.label")}
                  </MenuItem>
                  <MenuItem value={3}>
                    {t("statuspropertytype3.label")}
                  </MenuItem>
                  <MenuItem value={4}>
                    {t("statuspropertytype4.label")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={isMobile ? 6 : 3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={this.handleSubmit}
              >
                {t("updatestatuspropertybutton.label")}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default compose(
  withRouter,
  withAlert(),
  withStyles(styles),
  withTranslation()
)(Updatestatusproperty);
