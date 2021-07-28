import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { withTranslation } from "react-i18next";

class Terms extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Container
          maxWidth="md"
          style={{ paddingTop: "4%", paddingBottom: "4%" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h4" gutterBottom style={{ 'fontWeight': 'bold' }}>
            {t("terms1")}
          </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("terms2")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("terms3")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                {t("terms4")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("terms5")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                {t("terms6")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("terms7")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                {t("terms8")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("terms9")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                {t("terms10")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("terms11")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                {t("terms12")}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
export default withTranslation()(Terms);
