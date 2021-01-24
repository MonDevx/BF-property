
import React from "react";
import Formseachresult from "../../components/form-seach/form-seach.result.component.jsx";
import Container from "@material-ui/core/Container";
const Listrealestate = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 2500)).then(() =>
    import("../../components/list-realestate/list-realestate.component.jsx")
  );
});
class Seachresultpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:this.props.location.state,
    };
  }

  
  render() {
    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: "2%", paddingBottom: "2%" }}
      >
        <Formseachresult/>
        <Listrealestate value={this.props.location.state} />
      </Container>
    );
  }
}
export default Seachresultpage;

