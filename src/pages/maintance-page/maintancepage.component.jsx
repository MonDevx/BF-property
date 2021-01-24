import React from "react";
import Typography from "@material-ui/core/Typography";
class MaintancePage extends React.Component {
  render() {
    return (
      <div style={{ "text-align": "center", padding: "150px" }}>
        <Typography variant="h2">พบกันเร็วๆนี้</Typography>
        <div>
          <Typography variant="subtitle1">
            ขออภัยในความไม่สะดวก แต่เรากำลังดำเนินการบำรุงรักษาอยู่ในขณะนี้ ,
            มิฉะนั้นเราจะกลับมาออนไลน์ในไม่ช้า!
          </Typography>
          <Typography variant="subtitle2">&mdash; จากทีมงาน BF-property </Typography>
        </div>
      </div>
    );
  }
}
export default MaintancePage;
