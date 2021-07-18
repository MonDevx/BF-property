import Container from "@material-ui/core/Container";
import React from "react";
import Listrealestate from "../../components/list-realestate/list-realestate.component.jsx";
import { connect } from "react-redux";
import axios from "axios";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { withAlert } from "react-alert";
import { compose } from "redux";
class MyhousePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/myrealestatelist/${this.props.currentUser.id}`
      )
      .then((result) => {
        this.setState({
          property: result.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.props.alert.error(error.toString());
      });
  }

  render() {
    const { isLoading, property } = this.state;
    if (isLoading) {
      return (
        <div style={{ margin: "50%" }}>
          <LoaderSpinners />
        </div>
      );
    }
    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: "2%", paddingBottom: "2%" }}
      >
        <Listrealestate property={property} />
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
const enhance = compose(withAlert(), connect(mapStateToProps));
export default enhance(MyhousePage);
