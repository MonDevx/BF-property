import React from "react";
import axios from "axios";
import { withAlert } from "react-alert";
import Info from "../../components/section-property-detail/section-info-property-detail.component.jsx";
import Img from "../../components/section-property-detail/section-img-property-detail.component.jsx";
import Bar from "../../components/section-property-detail/section-bar-property-detail.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { getInitialProps } from "react-i18next";


class propertyDetailpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: [],
      nearbyplacesapi: [],
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
            property: result1.data.data,
            id: result1.data.id,
          },
          () => {
            axios({
              method: "GET",
              url: `https://api.longdo.com/POIService/json/search`,
              params: {
                key: process.env.REACT_APP_LONGDO_KEY,
                lon: this.state.property.longitude,
                lat: this.state.property.latitude,
                limit: "5",
              },
            })
              .then((result2) => {
                this.setState({
                  nearbyplacesapi: result2.data.data,
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
    const { isLoading, property, id } = this.state;
    if (isLoading) {
      return <LoaderSpinners />;
    }
    const url = window.location.href;
    const timeStampDate = property.createat;
    const dateInMillis = timeStampDate._seconds * 1000;

    var date = new Date(dateInMillis).toLocaleDateString(
      getInitialProps().initialLanguage === "th" ? "th-TH" : "en-GB"
    );

    return (
      <div>
        <React.Fragment>
 zz
          <Bar
            typeproperty={property.idtype}
            status={property.status}
            time={date}
          />
          <Img
            name={property.name}
            typeproperty={property.idtype}
            id={id}
            urloutside={property.urlimgoutside}
            urlinside={property.urlimginside}
            price={Number(property.price)}
          />
          <Info
            typeproperty={property.idtype}
            name={property.name}
            emailowner={property.email}
            detail={property.detail}
            sizefamily={property.sizefamily}
            airconditioner={property.airconditioner}
            propertysize={property.propertysize}
            price={property.price}
            pricesize={property.price / property.propertysize}
            numberofbathrooms={property.numberofbathrooms}
            numberofbedrooms={property.numberofbedrooms}
            numberoffloors={property.numberoffloors}
            numberofparkingspace={property.numberofparkingspace}
            yearofconstruction={property.yearofconstruction}
            latitude={property.latitude}
            longitude={property.longitude}
            address={property.address}
            district={property.district}
            subDistrict={property.subDistrict}
            province={property.province}
            zipCode={property.zipCode}
            furniture={property.furniture}
            centralservice={property.centralservice}
            landmark={property.landmark}
            building={property.building}
            projectname={property.projectname}
            nearbyplaces={property.nearbyplaces}
            nearbyplacesapi={this.state.nearbyplacesapi}
          />
        </React.Fragment>
      </div>
    );
  }
}
export default withAlert()(propertyDetailpage);
