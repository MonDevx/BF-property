import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import GpsFixedRoundedIcon from "@mui/icons-material/GpsFixedRounded";

import React from "react";

import { withTranslation } from "react-i18next";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { Map, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import Control from "react-leaflet-control";
import Chip from "@mui/material/Chip";
import AutocompleteSeach from "../autocomplete-seach/autocomplete-seach.jsx";
Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
class SimpleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,

      markers: [
        {
          position: { lat: 0, lng: 0 },
        },
      ],
      draggable: null,
    };
    this.onGpsClicked = this.onGpsClicked.bind(this);
  }
  componentWillMount() {
    this.setState({
      lat: this.props.lat,
      lng: this.props.lng,

      markers: [
        {
          position: { lat: this.props.lat, lng: this.props.lng },
        },
      ],
      draggable: this.props.draggable,
    });
  }

  handleSelect = (address) => {
    geocodeByAddress(address.description)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({
          lat: latLng.lat,
          lng: latLng.lng,
          markers: [
            {
              position: {
                lat: latLng.lat,
                lng: latLng.lng,
              },
            },
          ],
        });
        this.props.onChange(latLng.lat, latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };
  onGpsClicked() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        markers: [
          {
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
        ],
      });
      this.props.onChange(position.coords.latitude, position.coords.longitude);
    });
  }
  showInMapClicked = () => {
    window.open(
      `https://www.google.com/maps/place/${this.state.lat}+${this.state.lng}/@${this.state.lat},${this.state.lng},15z`,
      "_blank"
    );
  };
  updatePosition = (event) => {
    this.setState({
      lat: event.target.getLatLng().lat,
      lng: event.target.getLatLng().lng,
      markers: [
        {
          position: event.target.getLatLng(),
        },
      ],
    });

    this.props.onChange(
      event.target.getLatLng().lat,
      event.target.getLatLng().lng
    );
  };
  render() {
    const { t } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <React.Fragment>
        {this.state.draggable && (
          <React.Fragment>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="error">
                {t("gpshelp.label")}
              </Typography>
              <Typography variant="subtitle2" color="error">
                {t("maphelp.label")}
              </Typography>
            </Grid>
          </React.Fragment>
        )}

        <Grid item xs={12}>
          <Map
            center={position}
            zoom={19}
            doubleClickZoom={false}
            closePopupOnClick={false}
            dragging={this.state.draggable}
            trackResize={false}
            scrollWheelZoom={false}
            style={{
              position: "relative",
              width: "100%",
              height: "45vh",
              marginTop: "2.5%",
              marginBottom: "2.5%",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {this.state.markers.map((marker, index) => (
              <Marker
                key={index}
                draggable={this.state.draggable}
                onDragend={this.updatePosition}
                position={marker.position}
              />
            ))}
            {this.state.draggable ? (
              <React.Fragment>
                <Control position="topleft">
                  <Button
                    startIcon={<GpsFixedRoundedIcon />}
                    variant="contained"
                    color="primary"
                    onClick={this.onGpsClicked}
                  >
                    {t("gps.label")}
                  </Button>
                </Control>
                <Control position="topright">
                  <AutocompleteSeach handleSelect={this.handleSelect} />
                </Control>
              </React.Fragment>
            ) : (
              <Control position="topleft">
                <Button
                  startIcon={<GpsFixedRoundedIcon />}
                  variant="contained"
                  color="primary"
                  onClick={this.showInMapClicked}
                >
                  {"Google map"}
                </Button>
              </Control>
            )}
            <Control position="bottomleft">
              <Chip
                label={
                  t("addressfromlat.label") +
                  " : " +
                  this.state.lat +
                  " " +
                  t("addressfromlong.label") +
                  " : " +
                  this.state.lng
                }
              />
            </Control>
          </Map>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withTranslation()(SimpleMap);
