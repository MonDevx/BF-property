import React from "react";
import { useTranslation } from "react-i18next";
import Chip from "@material-ui/core/Chip";
import { getDistance } from "geolib";
import NearMeIcon from "@material-ui/icons/NearMe";
import DoneIcon from "@material-ui/icons/Done";

export const ChipNearbyPlaces = (props) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>

      {props.nearbyplaces.map((nearbyplace, index) =>
       nearbyplace.LocationName !== "" ? (
          <Chip
            icon={<NearMeIcon />}
            color="primary"
            label={
              (props.latitude && props.longitude
                ?nearbyplace.name.length < 26
                  ?nearbyplace.name
                  :nearbyplace.name.substring(0, 26) + " ..."
                :nearbyplace.LocationName.length < 26
                ?nearbyplace.LocationName
                :nearbyplace.LocationName.substring(0, 26) + " ...") +
              " " +
              "(" +
              (props.latitude && props.longitude
                ? getDistance(
                    { latitude: props.latitude, longitude: props.longitude },
                    { latitude:nearbyplace.lat, longitude:nearbyplace.lon }
                  ) / 1000
                :nearbyplace.Distance / 1000
              ).toFixed(2) +
              " " +
              t("kilometer.label") +
              ")"
            }
            key={index}
          />
        ) : null
      )}


    </React.Fragment>
  );
};

export const ChipCentralServiceAndFurniture = (props) => {
  return (
    <React.Fragment>
      {props.listItems.map((item, index) => (
        <React.Fragment>
          {item.checked === true ? (
            <Chip key={index} label={item.name} icon={<DoneIcon />} />
          ) : (
            ""
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export const ChipFileImage = (props) => {
  return (
    <React.Fragment>
      {props.files.map((file, index) => (
        <React.Fragment>
          <Chip key={index} label={file.name} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export const ChipStatus = (props, index) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Chip

        color="primary"


        key={index}
        label={
          props.status === 1
            ? t("statuspropertytype1.label")
            : props.status === 2
            ? t("statuspropertytype2.label")
            : props.status === 3
            ? t("statuspropertytype3.label")
            : props.status === 4
            ? "ให้เห็นเฉพาะส่วนตัว"
            : t("statuspropertytype1.label")
        }
        style={{
          backgroundColor:
            props.status === 1
              ? "#32CD32"
              : props.status === 2
              ? "#FFBF00"
              : props.status === 3 || props.status === 4
              ? "#CD5C5C"
              : "#32CD32",
        }}
      />
    </React.Fragment>
  );
};
