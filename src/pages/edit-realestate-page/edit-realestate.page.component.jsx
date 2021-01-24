import React from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import Editproperty from "../../components/edit-property/edit-property.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
class EditpropertyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realestate: [],
      redirect: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/editrealestatedetail/${this.props.location.state.id}`
      )
      .then((result) => {
        this.setState({
          id:result.data.id,
          realestate: result.data.data,
          isLoading: false,
        });

      })
      .catch((error) => {
        console.log(error)
        this.setState({
          redireact: "/",
        });
      });
  }
  render() {
    const { isLoading, realestate, redirect ,id} = this.state;
    if (redirect) {
      return <Redirect to={redirect} />;
    }
    if (isLoading) {
      return <LoaderSpinners />;
    }
    return <Editproperty property={realestate} id={id}/>;
  }
}

export default withRouter(EditpropertyPage);
