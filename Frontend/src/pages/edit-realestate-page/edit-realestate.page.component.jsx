import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import Redirect from "react-router-dom/Redirect";
import Editproperty from "../../components/edit-property/edit-property.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { auth } from "../../firebase/firebase.utils";
import { withAlert } from "react-alert";
import { compose } from "redux";
class EditpropertyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realestate: [],
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
        url: `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/editrealestatedetail/${this.props.location.state.id}`,
        method: "GET",
      })
        .then((result) => {
          this.setState({
            realestate: result.data,
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
    const { isLoading, realestate, redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    if (isLoading) {
      return (
        <div style={{ margin: "100%" }}>
          <LoaderSpinners />
        </div>
      );
    }
    return <Editproperty property={realestate.data} id={realestate.id} />;
  }
}

export default compose(withRouter, withAlert())(EditpropertyPage);
