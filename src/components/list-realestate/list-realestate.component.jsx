import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { withTranslation } from "react-i18next";
import { firestorage, firestore } from "../../firebase/firebase.utils";
import { compose } from "redux";
import { connect } from "react-redux";
import { withAlert } from "react-alert";
import Cardhouse from "../card-realestate/card-realestate.component.jsx";
import axios from "axios";
import { auth } from "../../firebase/firebase.utils.js";

class Listproperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentPage: 1,
      todosPerPage: 8,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event, value) {
    this.setState({
      currentPage: Number(value),
    });
  }
  componentWillMount() {
    if (window.location.pathname !== "/seach-result") {
      this.setState({
        todos: this.props.todos,
      });
    }
  }
  componentDidMount() {
    if (window.location.pathname === "/seach-result") {
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
        type,
        province,
        price,
        room,
        family,
        bath,
        car,
        size,
        check
      );
    }
  }
  seach(seachkey, type, province, price, room, family, bath, car, size, check) {
    const { t } = this.props;
    var ref;
    var min, max;
    var sizemin, sizemax;

    if (price === 1) {
      min = 500000;
      max = 1000000;
    } else if (price === 2) {
      min = 1000000;
      max = 5000000;
    } else if (price === 3) {
      min = 5000000;
      max = 10000000;
    } else if (price === 4) {
      min = 10000000;
      max = 100000000000;
    }
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
      if (seachkey === 1 || seachkey === 2) {
        ref = firestore.collection("house").where("idtype", "==", seachkey);
      } else if (seachkey === "view") {
        ref = firestore.collection("house").orderBy("countview", "desc");
      } else if (seachkey === "new") {
        ref = firestore.collection("house").orderBy("CreateAt", "desc");
      } else {
        ref = firestore.collection("house").where("province", "==", seachkey);
      }
    } else if (
      type === 0 &&
      province === "" &&
      price === 0 &&
      room === 0 &&
      family === 0 &&
      bath === 0 &&
      car === 0 &&
      size === 0 &&
      check === true
    ) {
      ref = firestore.collection("house");
    } else {
      ref = firestore.collection("house");

      if (type !== 0) {
        ref = ref.where("idtype", "==", type);
      }

      if (province !== "") {
        ref = ref.where("province", "==", province);
      }

      if (room !== 0) {
        ref = ref.where("Numberofbedrooms", "==", room);
      }
      if (family) {
        if (family !== 0) {
          ref = ref.where("sizefamily", "==", family);
        }
      }
      if (bath) {
        if (bath !== 0) {
          ref = ref.where("Numberofbathrooms", "==", bath);
        }
      }

      if (car) {
        if (car !== 0) {
          ref = ref.where("Numberofparkingspace", "==", car);
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
        if (price !== 4) {
          ref = ref.orderBy("price").startAt(min).endAt(max);
        } else {
          ref = ref.where("price", ">=", min);
        }
      }
    }

    ref.get().then((querySnapshot) => {
      var todos = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().status !== 4) {
          let dict = { id: doc.id, ...doc.data() };
          todos.push(dict);
        }
      });

      var todos2 = [];

      if (size !== 0 && size) {
        for (var i in todos) {
          if (todos[i].Housesize >= sizemin && todos[i].Housesize <= sizemax) {
            todos2.push(todos[i]);
          }
        }

        this.setState({
          todos: todos2,
        });
      } else {
        this.setState({
          todos: todos,
        });
      }

      if (this.state.todos.length === 0) {
        this.props.alert.error(t("seach.error"));
      } else {
        this.props.alert.success(
          t("seach.listtotal") +
            " " +
            this.state.todos.length +
            " " +
            t("list.label")
        );
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (window.location.pathname === "/seach-result") {
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
          type,
          province,
          price,
          room,
          family,
          bath,
          car,
          size,
          check
        );
      }
    }
  }
  render() {
    const { todos, currentPage, todosPerPage } = this.state;
    const { currentUser, alert } = this.props;
    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const { t } = this.props;
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }
    const updateFavorites = (favorite, event) => {
      auth.currentUser
        .getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
          axios({
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
            url:
              "https://us-central1-bfproperty.cloudfunctions.net/webApi/api/v1/usersupdatefavorite",
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
    const handleFavorite = (event) => {
      event.persist();
      try {
        var favorite = currentUser.favorite;
        var check = false;
        if (favorite.length === 0) {
          favorite.push(event.currentTarget.value);
          updateFavorites(favorite);
          alert.success(t("alertaddfavoritehouse"));
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
            alert.success(t("alertaddfavoritehouse"));
          } else {
            updateFavorites(favorite, event);
            if (window.location.pathname === "/my-favorite") {
              this.setState({
                todos: todos.filter((e) => e.id !== event.currentTarget.value),
              });
            }
            alert.success(t("alertdeletefavoritehouse"));
          }
        }
      } catch (e) {
        if (e) {
          alert.error("การเพิ่มลงในรายการที่ชอบแล้วเกิดข้อผิดผลาด");
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
          .then(function () {})
          .catch(function (error) {
            alert.error("delete error", error);
          });
      });
      // eslint-disable-next-line array-callback-return
      Object.entries(urlout).map(([keyName, keyIndex]) => {
        var delete_imgtRef = firestorage.refFromURL(urlout[keyName].original);

        delete_imgtRef
          .delete()
          .then(function () {})
          .catch(function (error) {
            alert.error("delete error", error);
          });
      });

      var delete_inforef = firestore.collection("house").doc(id);
      delete_inforef
        .delete()
        .then(function () {})
        .catch(function (error) {
          console.log("delete error", error);
        });
      this.setState({
        todos: todos.filter((e) => e.id !== id),
      });
      alert.success(t("alertdeletehouse"));
    };
    return (
      <Container
        maxWidth="lg"
        style={{ paddingTop: "2%", paddingBottom: "2%" }}
      >
        <Grid item xs={12}>
          {(() => {
            if (window.location.pathname === "/my-house") {
              return (
                <Typography variant="h5">
                  {t("myhouse.label")} {todos.length} {t("list.label")}
                </Typography>
              );
            } else if (window.location.pathname === "/my-favorite") {
              return (
                <Typography variant="h5">
                  {t("myfavorite.label")} {todos.length} {t("list.label")}
                </Typography>
              );
            } else if (window.location.pathname === "/seach-result") {
              return (
                <Typography variant="h5">
                  {t("seachresult.label")} {todos.length} {t("list.label")}
                </Typography>
              );
            } else {
            }
          })()}
          {todos.length > 0 ? (
            <React.Fragment>
              {window.location.pathname !== "/" ? (
                <Typography variant="subtitle1">
                  {t("page.label")} {currentPage} / {pageNumbers.length}
                </Typography>
              ) : null}

              <Cardhouse
                currentTodos={currentTodos}
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
                padding: window.location.pathname === "/" ? "10%" : "15%",
              }}
            >
              <Typography variant="h5">
                {t(
                  window.location.pathname === "/my-house"
                    ? "myhouseempty.label"
                    : window.location.pathname === "/seach-result"
                    ? "seachresultemty.label"
                    : window.location.pathname === "/"
                    ? "ไม่มีรายการบ้านแนะนำ"
                    : "myfavoriteempty.label"
                )}
              </Typography>
            </Grid>
          )}
          {window.location.pathname !== "/" ? (
            <Pagination
              count={pageNumbers.length}
              page={currentPage}
              size="large"
              id={currentPage}
              onChange={this.handleClick}
              showFirstButton={todos.length > 0}
              showLastButton={todos.length > 0}
              style={{ paddingTop: "2%" }}
              hideNextButton={todos.length === 0}
              hidePrevButton={todos.length === 0}
            />
          ) : null}
        </Grid>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default compose(
  connect(mapStateToProps),
  withTranslation(),
  withAlert()
)(Listproperty);
