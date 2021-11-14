import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoaderSpinners from "./components/loader-spinners/loader-spinners.jsx";
import loadable from "react-loadable";
const AddlistingPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "addlisting.page"*/ "./Pages/add-listing-page/add-listing.page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const EditprofilePage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "editprofile.page"*/ "./Pages/edit-profile-page/edit-profile.page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const FavoritepropertyPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "favoriteproperty.page"*/ "./Pages/favorite-realestate-page/favorite-realestate.page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const IndexPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "index.page"*/ "./Pages/index-page/index-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const MypropertyPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "myproperty.page"*/ "./Pages/my-realestate-page/my-realestate-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const NotfoundPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "notfound.page"*/ "./Pages/notfound-page/notfoundpage.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const ProfilePage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "profile.page"*/ "./Pages/profile-page/profile-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const PropertydetailPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "propertydetail.page"*/ "./Pages/realestate-detail-page/realestate-detail-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const ResetpasswordPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "resetpassword.page"*/ "./Pages/resetpassword-page/resetpassword.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const SeachresultPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "seachresult.page"*/ "./Pages/seach-result-page/seach-result-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const SigninandSignupPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "signinandsignup.page"*/ "./Pages/signin-signup-page/sigin-signup-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const TermsPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "terms.page"*/ "./Pages/terms-page/terms-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const UpdatestatusPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "updatestatus.page"*/ "./Pages/update-status-page/update-status-page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const EditpropertyPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "editproperty.page"*/ "./Pages/edit-realestate-page/edit-realestate.page.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const ChangepasswordPage = loadable({
  loader: () =>
    import(
      /* webpackChunkName: "changepassword.page"*/ "./Pages/changepassword-page/changepassword.component.jsx"
    ),
  loading: () => LoaderSpinners,
});
const Routes = (props) => {
  return (
    
    <Switch>
      <Route path="/" exact component={IndexPage} />
      <Route
        path="/signin"
        render={() =>
          props.currentUser ? <Redirect to="/" /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/add-listing"
        render={() =>
          props.currentUser ? <AddlistingPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/property-edit"
        render={() =>
          props.currentUser ? <EditpropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/property-detail/:name" component={PropertydetailPage} />
      <Route exact path="/termsandcondition" component={TermsPage} />
      <Route
        path="/property-updatestatus"
        render={() =>
          props.currentUser ? <UpdatestatusPage /> : <SigninandSignupPage />
        }
      />
      <Route path="/seach-result" component={SeachresultPage} />
      <Route
        path="/my-favorite"
        render={() =>
          props.currentUser ? <FavoritepropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route
        path="/profile"
        render={({ match: { url } }) =>
          props.currentUser ? (
            <React.Fragment>
              <Route path={`${url}`} component={ProfilePage} exact />
              <Route path={`${url}/edit-profile`} component={EditprofilePage} />
              <Route
                path={`${url}/changepassword`}
                component={ChangepasswordPage}
              />
            </React.Fragment>
          ) : (
            <SigninandSignupPage />
          )
        }
      />
      <Route path={`/resetpassword`} component={ResetpasswordPage} />
      <Route
        path="/my-property"
        render={() =>
          props.currentUser ? <MypropertyPage /> : <SigninandSignupPage />
        }
      />
      <Route path="*" component={NotfoundPage} />
    </Switch>
  );
};

export default Routes;
