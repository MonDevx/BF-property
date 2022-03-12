import Container from "@mui/material/Container";
import React from "react";
import Listrealestate from "../../components/list-realestate/list-realestate.component.jsx";
import { connect } from "react-redux";
import axios from "axios";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { withAlert } from "react-alert";
import { compose } from "redux";
import { auth } from "../../firebase/firebase.utils"

class MyhousePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: [],
      redirect: null,
      isLoading: true,
      idToken: null
    };
  }
  async componentDidMount() {
    const { alert } = this.props;
    await auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        this.setState({
          idToken: idToken,
        });
      })
      .catch((error) => {
        alert.error(error.toString());
        this.setState({
          redirect:"/"
        });
      });
    if (this.state.idToken) {

      axios({
        headers: {
          Authorization: `Bearer ${this.state.idToken}`,
        },
        url: "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/myrealestatelist",
        method: "GET",
      })
        .then((result) => {
          this.setState({
            property: result.data,
            isLoading: false,
          });
        })
        .catch((error) => {
          alert.error(error.toString());
        });
    } else {
      this.setState({
        isLoading: false,
        redirect:"/"
      });
    }
  }

  render() {
    const { isLoading, property, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
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
