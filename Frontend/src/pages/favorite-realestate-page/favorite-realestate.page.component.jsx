import React from "react";
import axios from "axios";
import Listrealestate from "../../components/list-realestate/list-realestate.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import Container from "@material-ui/core/Container";
import { compose } from "redux";
import { auth } from "../../firebase/firebase.utils";

class FavoritePage extends React.Component {
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
    const { currentUser, alert } = this.props;
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
    if (currentUser.favorite.length && this.state.idToken) {

      axios({
        headers: {
          Authorization: `Bearer ${this.state.idToken}`,
        },
        url: "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/favoriterealestatelist",
        method: "GET",
        params: {
          favoritelist: currentUser.favorite,
        },
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
export default compose(connect(mapStateToProps), withAlert())(FavoritePage);
