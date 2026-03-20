import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { firestorage, firestore } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Cardproperty from "../card-realestate/card-realestate.component.jsx";
import axios from "axios";
import { auth } from "../../firebase/firebase.utils.js";
import * as _ from "lodash";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";

function Listproperty(props) {
  const { t } = useTranslation();
  const alert = useAlert();
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  const [property, setProperty] = useState(
    location.pathname !== "/seach-result" ? (props.property || []) : []
  );
  const [previousProperty] = useState(
    location.pathname !== "/seach-result" ? (props.property || []) : []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const propertyPerPage = 8;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, value) => {
    setCurrentPage(Number(value));
  };

  const seach = (seachkey, type, province, price, room, family, bath, car, size, check) => {
    let ref;
    let sizemin, sizemax;

    try {
      if (size === 0) {
        sizemin = 50;
        sizemax = 900;
      } else if (size === 1) {
        sizemin = 50;
        sizemax = 150;
      } else if (size === 2) {
        sizemin = 150;
        sizemax = 300;
      } else if (size === 3) {
        sizemin = 300;
        sizemax = 450;
      } else if (size === 4) {
        sizemin = 450;
        sizemax = 900;
      }

      if (seachkey) {
        if (seachkey ===  "บ้านเดี่ยว" || seachkey === "บ้านเทาว์เฮาส์") {
          ref = firestore
            .collection("property")
            .where("idtype", "==", seachkey ===  "บ้านเดี่ยว"?1:2);
        } else if (seachkey === "view") {
          ref = firestore.collection("property").orderBy("countview", "desc");
        } else if (seachkey === "new") {
          ref = firestore.collection("property").orderBy("CreateAt", "desc");
        } else {
          ref = firestore
            .collection("property")
            .where("province", "==", seachkey);
        }
      } else if (type === 0 && province === "" && price === 0 && room === 0) {
        // console.log("test 1");
        ref = firestore.collection("property");
      } else {
        // console.log("test 3 "+ type === "0");
        ref = firestore.collection("property");

        if (type !== 0) {
          ref = ref.where("idtype", "==", type);
        }

        if (province !== "") {
          ref = ref.where("province", "==", province);
        }

        if (room !== 0) {
          ref = ref.where("numberofbedrooms", "==", room);
        }
        if (family) {
          if (family !== 0) {
            ref = ref.where("sizefamily", "==", family);
          }
        }
        if (bath) {
          if (bath !== 0) {
            ref = ref.where("numberofbathrooms", "==", bath);
          }
        }

        if (car) {
          if (car !== 0) {
            ref = ref.where("numberofparkingspace", "==", car);
          }
        }
        if (check === false) {
          ref = ref.where("furniture", "==", [
            {
              name: "เครื่องปรับอากาศ",
              checked: false,
            },
            {
              name: "พัดลม",
              checked: false,
            },
            {
              name: "เครื่องฟอกอากาศ",
              checked: false,
            },
            {
              name: "เครื่องทำน้ำอุ่น",
              checked: false,
            },
            {
              name: "ตู้เย็น",
              checked: false,
            },

            {
              name: "ตู้เสื้อผ้า",
              checked: false,
            },
            {
              name: "ชุดโต๊ะเก้าอี้",
              checked: false,
            },
            {
              name: "โซฟา",
              checked: false,
            },
            {
              name: "เตียง",
              checked: false,
            },
          ]);
        }
        if (price) {
          if (price !== 0) {
            ref = ref
              .orderBy("price")
              .startAt((price = 1 ? 500000 : (price = 2 ? 1000000 : 5000000)))
              .endAt((price = 1 ? 1000000 : (price = 2 ? 5000000 : 10000000)));
          } else {
            ref = ref.where("price", ">=", 0);
          }
        }
      }

      ref.get().then((querySnapshot) => {
        const propertyArr = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().status !== 4) {
            let dict = { id: doc.id, ...doc.data() };
            propertyArr.push(dict);
          }
        });

        const property2 = [];

        if (size !== 0 && size) {
          for (const i in propertyArr) {
            if (
              propertyArr[i].propertysize >= sizemin &&
              propertyArr[i].propertysize <= sizemax
            ) {
              property2.push(propertyArr[i]);
            }
          }

          setProperty(property2);

          if (property2.length === 0) {
            alert.error(t("seach.error"));
          } else {
            alert.success(
              t("seach.listtotal") +
              " " +
              property2.length +
              " " +
              t("list.label")
            );
          }
        } else {
          setProperty(propertyArr);

          if (propertyArr.length === 0) {
            alert.error(t("seach.error"));
          } else {
            alert.success(
              t("seach.listtotal") +
              " " +
              propertyArr.length +
              " " +
              t("list.label")
            );
          }
        }
      });
    } catch (error) {
      alert.error(error.toString());
    }
  };

  useEffect(() => {
    if (location.pathname === "/seach-result" && props.value) {
      const {
        seachkey,
        type,
        province,
        price,
        room,
        family,
        bath,
        car,
        size,
        check,
      } = props.value;
      seach(
        seachkey,
        Number(type),
        province,
        Number(price),
        Number(room),
        Number(family),
        Number(bath),
        Number(car),
        Number(size),
        check
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(props.value)]);

  const indexOfLastTodo = currentPage * propertyPerPage;
  const indexOfFirstTodo = indexOfLastTodo - propertyPerPage;
  const currentProperty = property.slice(indexOfFirstTodo, indexOfLastTodo);
  const { name } = "";
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(property.length / propertyPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const updateFavorites = (favorite, event) => {
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        axios({
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          url: "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/usersupdatefavorite",
          method: "PUT",
          data: {
            favorite: favorite,
          },
        });
      })
      .catch(function (error) {
        alert.error(error);
      });
  };

  const sortproperty = (event) => {
    var sortProperty;
    if (event.target.value === 1) {
      sortProperty = _.sortBy(property, "price");
    } else if (event.target.value === 2) {
      sortProperty = _.sortBy(property, "price").reverse();
    } else if (event.target.value === 3) {
      sortProperty = _.sortBy(property, "name");
    } else {
      sortProperty = _.sortBy(property, "name").reverse();
    }
    setProperty(sortProperty);
    handleMenuClose();
  };

  const findproperty = (event) => {
    event.persist();
    if (event.target.value !== "") {
      setProperty(
        property.filter((item) => item.name.includes(event.target.value))
      );
    } else {
      setProperty(previousProperty);
    }
  };

  const handleFavorite = (event) => {
    event.persist();
    try {
      var favorite = currentUser.favorite;
      var check = false;
      if (favorite.length === 0) {
        favorite.push(event.currentTarget.value);
        updateFavorites(favorite);
        alert.success(t("alertaddfavoriteproperty"));
      } else {
        favorite.forEach((element, index) => {
          if (element === event.currentTarget.value) {
            check = true;
            favorite.splice(index, 1);
          }
        });
        if (check === false) {
          favorite.push(event.currentTarget.value);
          updateFavorites(favorite);
          alert.success(t("alertaddfavoriteproperty"));
        } else {
          updateFavorites(favorite, event);
          if (location.pathname === "/my-favorite") {
            setProperty(
              property.filter((e) => e.id !== event.currentTarget.value)
            );
          }
          alert.success(t("alertdeletefavoriteproperty"));
        }
      }
    } catch (e) {
      if (e) {
        alert.error(t("alertaddfavoritepropertyerror"));
      }
      // if (e !== BreakException) throw e;
    }
  };

  const deleteproperty = (id, urlin, urlout) => {
    // eslint-disable-next-line array-callback-return
    Object.entries(urlin).map(([keyName, keyIndex]) => {
      var delete_imgtRef = firestorage.refFromURL(urlin[keyName].original);
      delete_imgtRef
        .delete()
        .then(function () { })
        .catch(function (error) {
          alert.error("delete error", error);
        });
    });
    // eslint-disable-next-line array-callback-return
    Object.entries(urlout).map(([keyName, keyIndex]) => {
      var delete_imgtRef = firestorage.refFromURL(urlout[keyName].original);

      delete_imgtRef
        .delete()
        .then(function () { })
        .catch(function (error) {
          alert.error("delete error", error);
        });
    });

    var delete_inforef = firestore.collection("property").doc(id);
    delete_inforef
      .delete()
      .then(function () { })
      .catch(function (error) {
        console.log("delete error", error);
      });
    setProperty(property.filter((e) => e.id !== id));
    alert.success(t("alertdeleteproperty"));
  };

  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      style={{ paddingTop: "2%", paddingBottom: "2%" }}
    >
      <Grid item xs={6} sm={3}>
        {(() => {
          <React.Fragment></React.Fragment>;
          if (location.pathname === "/my-property") {
            return (
              <Typography variant="h5">
                {t("myproperty.label")} {property.length} {t("list.label")}
              </Typography>
            );
          } else if (location.pathname === "/my-favorite") {
            return (
              <Typography variant="h5">
                {t("myfavorite.label")} {property.length} {t("list.label")}
              </Typography>
            );
          } else if (location.pathname === "/seach-result") {
            return (
              <Typography variant="h5">
                {t("seachresult.label")} {property.length} {t("list.label")}
              </Typography>
            );
          }
        })()}
        {property.length > 0 && location.pathname !== "/" ? (
          <Typography variant="subtitle1">
            {t("page.label")} {currentPage} / {pageNumbers.length}
          </Typography>
        ) : null}
      </Grid>

      <Box display="flex" flexDirection="row-reverse" alignItems="center">
        {location.pathname !== "/" ? (
          <Box p={2}>
            <div>
              <Button
                onClick={handleMenuOpen}
                aria-controls="simple-menu"
                aria-haspopup="true"
                startIcon={<SortIcon />}
              >
                {t("sort.label")}
              </Button>

              <Menu
                id="simple-menu"
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem value={1} onClick={sortproperty}>
                  {t("sortmenu1.label")}
                </MenuItem>
                <MenuItem value={2} onClick={sortproperty}>
                  {t("sortmenu2.label")}
                </MenuItem>
                <MenuItem value={3} onClick={sortproperty}>
                  {t("sortmenu3.label")}
                </MenuItem>
                <MenuItem value={4} onClick={sortproperty}>
                  {t("sortmenu4.label")}
                </MenuItem>
              </Menu>
            </div>
          </Box>
        ) : null}
        {location.pathname === "/my-property" ? (
          <Box p={3}>
            <TextField
              id="outlined-basic"
              label={t("seachinput.label")}
              variant="outlined"
              onChange={findproperty}
              value={name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ) : null}
      </Box>
      {property.length > 0 ? (
        <React.Fragment>
          <Cardproperty
            currentProperty={currentProperty}
            onhandleFavorite={handleFavorite}
            deleteproperty={deleteproperty}
          />
        </React.Fragment>
      ) : (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{
            padding: location.pathname === "/" ? "10%" : "15%",
          }}
        >
          <Typography variant="h5">
            {t(
              location.pathname === "/my-property"
                ? "mypropertyempty.label"
                : location.pathname === "/seach-result"
                  ? "seachresultemty.label"
                  : location.pathname === "/"
                    ? "ไม่มีรายการบ้านแนะนำ"
                    : "myfavoriteempty.label"
            )}
          </Typography>
        </Grid>
      )}
      {location.pathname !== "/" ? (
        <Pagination
          count={pageNumbers.length}
          page={currentPage}
          size="large"
          id={currentPage}
          onChange={handleClick}
          showFirstButton={property.length > 0}
          showLastButton={property.length > 0}
          style={{ paddingTop: "2%" }}
          hideNextButton={property.length === 0}
          hidePrevButton={property.length === 0}
        />
      ) : null}
    </Grid>
  );
}

export default Listproperty;
