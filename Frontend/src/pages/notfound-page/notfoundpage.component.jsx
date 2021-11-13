import React from "react";
import Link from "react-router-dom/Link";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
class NotFoundPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div align="center" style={{ padding: "5%" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                404: หน้าที่คุณกำลังมองหาไม่อยู่ที่นี่
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                style={{ color: "#a1a5b1" }}
                gutterBottom
              >
                คุณอาจลองเส้นทางที่ร่มรื่นหรือมาที่นี่โดยไม่ได้ตั้งใจ
                ไม่ว่าจะใช้วิธีไหนให้ลองใช้การนำทาง
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <img
                alt=""
                src="./assets/img/svg/Illustration/undraw_page_not_found_su7k.svg"
                width="100%"
                height="250px"
              ></img>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/"
                size="large"
              >
                กลับหน้าแรก
              </Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
export default NotFoundPage;
