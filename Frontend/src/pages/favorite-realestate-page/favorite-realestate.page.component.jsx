import React, { useState, useEffect } from "react";
import axios from "axios";
import Listrealestate from "../../components/list-realestate/list-realestate.component.jsx";
import LoaderSpinners from "../../components/loader-spinners/loader-spinners.jsx";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

function FavoritePage() {
  const alert = useAlert();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [property, setProperty] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then((idToken) => {
        if (cancelled) return;
        if (currentUser.favorite.length && idToken) {
          axios({
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
            url: "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/favoriterealestatelist",
            method: "GET",
            params: {
              favoritelist: currentUser.favorite,
            },
          })
            .then((result) => {
              if (!cancelled) {
                setProperty(result.data);
                setIsLoading(false);
              }
            })
            .catch((error) => {
              alert.error(error.toString());
            });
        } else {
          if (!cancelled) {
            setIsLoading(false);
            setRedirect("/");
          }
        }
      })
      .catch((error) => {
        alert.error(error.toString());
        if (!cancelled) setRedirect("/");
      });
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

export default FavoritePage;
