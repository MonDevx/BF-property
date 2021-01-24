import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  const lastSignInTime = userAuth.metadata.lastSignInTime;

  if (!snapShot.exists) {
    const { displayName, email, photoURL,uid } = userAuth;
    const favorite = [];
    const myrealestate = [];
    const createdAt = new Date();
    try {
      await userRef.set({
        uid,
        displayName,
        email,
        photoURL,
        createdAt,
        lastSignInTime,
        favorite,
        myrealestate,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } else {
    userRef.update({ lastSignInTime: lastSignInTime });
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const firestore2 = firebase.firestore;
export const firestorage = firebase.storage();
export const firestorage2 = firebase.storage;
export const databaserealtime = firebase.database();
const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(providerGoogle);

const providerFacebook = new firebase.auth.FacebookAuthProvider();
providerFacebook.setCustomParameters({ prompt: "select_account" });
export const signInWithFacebook = () => auth.signInWithPopup(providerFacebook);

export default firebase;
