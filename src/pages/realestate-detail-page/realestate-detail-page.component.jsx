import React from "react";
import axios from "axios";
import { withAlert } from "react-alert";
import Info from "../../components/section-property-detail/section-info-property-detail.component.jsx";
import Img from "../../components/section-property-detail/section-img-property-detail.component.jsx";
import Bar from "../../components/section-property-detail/section-bar-property-detail.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { getInitialProps } from "react-i18next";

class PropertyDetailpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      Nearbyplacesapi: [],
      isLoading: true,
      id: null,
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/realestatedetail/${this.props.match.params.name}`
      )
      .then((result1) => {

        this.setState(
          {
            todos: result1.data.data,
            id: result1.data.id,

          },
          () => {
            axios({
              method: "GET",
              url: `https://api.longdo.com/POIService/json/search`,
              params: {
                key: process.env.REACT_APP_LONGDO_KEY,
                lon: this.state.todos.longitude,
                lat: this.state.todos.latitude,
                limit: "5",
              },
            })
              .then((result2) => {
                this.setState({
                  Nearbyplacesapi: result2.data.data,
                  isLoading: false,
                });
              })
              .catch((error) => {
                this.props.alert.error(error);
              });
          }
        );
      })
      .catch((error) => {
        this.props.alert.error(error);
      });
  }

  render() {
    const { isLoading, todos, id } = this.state;
    if (isLoading) {
      return (
        <div style={{ margin: "100%" }}>
          <LoaderSpinners />
        </div>
      );
    }

    const timeStampDate = todos.CreateAt;
    const dateInMillis = timeStampDate._seconds * 1000;

    var date = new Date(dateInMillis).toLocaleDateString(
      getInitialProps().initialLanguage === "th" ? "th-TH" : "en-GB"
    );

    return (
      <div>
        <React.Fragment>
          <Bar typehouse={todos.idtype} status={todos.status} time={date} />
          <Img
            name={todos.name}
            typehouse={todos.idtype}
            id={id}
            urloutside={todos.urlimgoutside}
            urlinside={todos.urlimginside}
            price={Number(todos.price)}
          />
          <Info
            typehouse={todos.idtype}
            name={todos.name}
            emailowner={todos.email}
            detail={todos.detail}
            sizefamily={todos.sizefamily}
            Airconditioner={todos.Airconditioner}
            Housesize={todos.Housesize}
            price={todos.price}
            pricesize={todos.price / todos.Housesize}
            Numberofbathrooms={todos.Numberofbathrooms}
            Numberofbedrooms={todos.Numberofbedrooms}
            Numberoffloors={todos.Numberoffloors}
            Numberofparkingspace={todos.Numberofparkingspace}
            Yearofconstruction={todos.Yearofconstruction}
            latitude={todos.latitude}
            longitude={todos.longitude}
            Address={todos.Address}
            District={todos.District}
            subDistrict={todos.subDistrict}
            province={todos.province}
            zipCode={todos.zipCode}
            furniture={todos.furniture}
            centralservice={todos.centralservice}
            Landmark={todos.Landmark}
            building={todos.building}
            projectname={todos.projectname}
            Nearbyplaces={todos.Nearbyplaces}
            Nearbyplacesapi={this.state.Nearbyplacesapi}
          />
        </React.Fragment>
      </div>
    );
  }
}
export default withAlert()(PropertyDetailpage);
