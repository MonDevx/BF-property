import React from "react";
import Formseachresult from "../../components/form-seach/form-seach.result.component.jsx";
import Container from "@material-ui/core/Container";
import { Redirect } from 'react-router';
import qs from 'query-string';

const Listrealestate = React.lazy(() => {
  return new Promise((resolve) => setTimeout(resolve, 2500)).then(() =>
    import("../../components/list-realestate/list-realestate.component.jsx")
  );
});

function Seachresultpage(props) {
  // const { value } = props.location;
  // if (value == null) {
  //   return <Redirect to="/" />;
  // }
  return (
    <Container
      maxWidth="lg"
      style={{ paddingTop: "2%", paddingBottom: "2%" }}
    >
      <Formseachresult />
      <Listrealestate value={qs.parse(props.location.search)} />
    </Container>
  );
}

export default Seachresultpage;
