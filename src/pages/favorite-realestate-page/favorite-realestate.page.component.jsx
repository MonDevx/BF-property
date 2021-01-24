import React from "react";
import axios from "axios";
import Listrealestate from "../../components/list-realestate/list-realestate.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import Container from "@material-ui/core/Container";
import { compose } from "redux";
class FavoritePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      isLoading: true,
    };

  }
  componentDidMount() {

    if(this.props.currentUser.favorite.length){
       axios({
      url:
        "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/favoriterealestatelist",
      method: "GET",
      params: {
        favoritelist: this.props.currentUser.favorite,
      },
    })
      .then((result) => {
        this.setState({
          todos: result.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      this.setState({
        isLoading: false,
      });
    }
  }


  render() {
    const { isLoading, todos } = this.state;
    if (isLoading) {
      return <div style={{margin: '50%'}}><LoaderSpinners /></div>;
    }
    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: "2%", paddingBottom: "2%" }}
      >
        <Listrealestate todos={todos} />
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default compose(connect(mapStateToProps), withAlert())(FavoritePage);
