import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GpsFixedRoundedIcon from "@material-ui/icons/GpsFixedRounded";

import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { Map, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import Control from "react-leaflet-control";
import Chip from "@material-ui/core/Chip";
import AutocompleteSeach from "../autocomplete-seach/autocomplete-seach.jsx";
Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function SimpleMap(props) {
  const { t } = useTranslation();

  const [lat, setLat] = useState(props.lat);
  const [lng, setLng] = useState(props.lng);
  const [markers, setMarkers] = useState([
    {
      position: { lat: props.lat, lng: props.lng },
    },
  ]);
  const [draggable] = useState(props.draggable);

  const handleSelect = (address) => {
    geocodeByAddress(address.description)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLat(latLng.lat);
        setLng(latLng.lng);
        setMarkers([
          {
            position: {
              lat: latLng.lat,
              lng: latLng.lng,
            },
          },
        ]);
        props.onChange(latLng.lat, latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };

  const onGpsClicked = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      setMarkers([
        {
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        },
      ]);
      props.onChange(position.coords.latitude, position.coords.longitude);
    });
  };

  const showInMapClicked = () => {
    window.open(
      `https://www.google.com/maps/place/${lat}+${lng}/@${lat},${lng},15z`,
      "_blank"
    );
  };

  const updatePosition = (event) => {
    setLat(event.target.getLatLng().lat);
    setLng(event.target.getLatLng().lng);
    setMarkers([
      {
        position: event.target.getLatLng(),
      },
    ]);
    props.onChange(
      event.target.getLatLng().lat,
      event.target.getLatLng().lng
    );
  };

  const position = [lat, lng];
  return (
    <React.Fragment>
      {draggable && (
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
          dragging={draggable}
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
          {markers.map((marker, index) => (
            <Marker
              key={index}
              draggable={draggable}
              onDragend={updatePosition}
              position={marker.position}
            />
          ))}
          {draggable ? (
            <React.Fragment>
              <Control position="topleft">
                <Button
                  startIcon={<GpsFixedRoundedIcon />}
                  variant="contained"
                  color="primary"
                  onClick={onGpsClicked}
                >
                  {t("gps.label")}
                </Button>
              </Control>
              <Control position="topright">
                <AutocompleteSeach handleSelect={handleSelect} />
              </Control>
            </React.Fragment>
          ) : (
            <Control position="topleft">
              <Button
                startIcon={<GpsFixedRoundedIcon />}
                variant="contained"
                color="primary"
                onClick={showInMapClicked}
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
                lat +
                " " +
                t("addressfromlong.label") +
                " : " +
                lng
              }
            />
          </Control>
        </Map>
      </Grid>
    </React.Fragment>
  );
}

export default SimpleMap;
