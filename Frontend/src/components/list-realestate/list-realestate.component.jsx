import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from '@mui/material/Pagination';
import React from "react";
import { withTranslation } from "react-i18next";
import { firestorage, firestore } from "../../firebase/firebase.utils";
import { compose } from "redux";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import Cardproperty from "../card-realestate/card-realestate.component.jsx";
import axios from "axios";
import { auth } from "../../firebase/firebase.utils.js";
import * as _ from "lodash";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
class Listproperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: [],
      previousProperty: [],
      currentPage: 1,
      propertyPerPage: 8,
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event, value) {
    this.setState({
      currentPage: Number(value),
    });
  }
  componentWillMount() {
    if (this.props.location.pathname !== "/seach-result") {
      this.setState({
        property: this.props.property,
        previousProperty: this.props.property,
      });
    }
  }
  componentDidMount() {
    if (this.props.location.pathname === "/seach-result") {
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
      } = this.props.value;
      this.seach(
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
  }
  seach(seachkey, type, province, price, room, family, bath, car, size, check) {
    const { t } = this.props;
    var ref;
    var sizemin, sizemax;

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
        if (seachkey === "บ้านเดี่ยว" || seachkey === "บ้านเทาว์เฮาส์") {
          ref = firestore
            .collection("property")
            .where("idtype", "==", seachkey === "บ้านเดี่ยว" ? 1 : 2);
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
              .startAt((price === 1 ? 500000 : (price === 2 ? 1000000 : 5000000)))
              .endAt((price === 1 ? 1000000 : (price === 2 ? 5000000 : 10000000)));
          } else if (price === 4) {
            ref = ref.where("price", ">", 10000000);
          } else {
            ref = ref.where("price", ">=", 0);
          }
        }
      }

      ref.get().then((querySnapshot) => {
        var property = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().status !== 4) {
            let dict = { id: doc.id, ...doc.data() };
            property.push(dict);
          }
        });

        var property2 = [];

        if (size !== 0 && size) {
          for (var i in property) {
            if (
              property[i].propertysize >= sizemin &&
              property[i].propertysize <= sizemax
            ) {
              property2.push(property[i]);
            }
          }

          this.setState({
            property: property2,
          });
        } else {
          this.setState({
            property: property,
          });
        }

        if (this.state.property.length === 0) {
          this.props.alert.error(t("seach.error"));
        } else {
          this.props.alert.success(
            t("seach.listtotal") +
            " " +
            this.state.property.length +
            " " +
            t("list.label")
          );
        }
      });
    } catch (error) {
      this.props.alert.error(error.toString());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname === "/seach-result") {
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
      } = this.props.value;
      if (
        JSON.stringify(this.props.value) !== JSON.stringify(prevProps.value)
      ) {
        this.seach(
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
    }
  }
  render() {
    const { property, currentPage, propertyPerPage, anchorEl } = this.state;
    const { currentUser, alert, location } = this.props;
    const { name } = "";
    const indexOfLastTodo = currentPage * propertyPerPage;
    const indexOfFirstTodo = indexOfLastTodo - propertyPerPage;
    const currentProperty = property.slice(indexOfFirstTodo, indexOfLastTodo);
    const { t } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(property.length / propertyPerPage); i++) {
      pageNumbers.push(i);
    }
    const handleMenuClose = () => {
      this.setState({
        isMenuOpen: false,
        anchorEl: null,
      });
    };

    const handleMenuOpen = (event) => {
      this.setState({
        isMenuOpen: true,
        anchorEl: event.currentTarget,
      });
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
      this.setState({
        property: sortProperty,
      });
      handleMenuClose();
    };
    const findproperty = (event) => {
      event.persist();
      if (event.target.value !== "") {
        this.setState({
          property: property.filter((item) =>
            item.name.includes(event.target.value)
          ),
        });
      } else {
        this.setState((state) => ({
          property: state.previousProperty,
        }));
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
            if (this.props.location.pathname === "/my-favorite") {
              this.setState({
                property: property.filter(
                  (e) => e.id !== event.currentTarget.value
                ),
              });
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
      this.setState({
        property: property.filter((e) => e.id !== id),
      });
      alert.success(t("alertdeleteproperty"));
    };
    return (
      <Grid
        container
        justifyContent="space-between"
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
          {property.length > 0 && this.props.location.pathname !== "/" ? (
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
            justifyContent="center"
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
            onChange={this.handleClick}
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
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default compose(
  connect(mapStateToProps),
  withTranslation(),
  withRouter,
  withAlert()
)(Listproperty);
