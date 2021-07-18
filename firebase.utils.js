import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  const lastSignInTime = userAuth.metadata.lastSignInTime;

  if (!snapShot.exists) {
    const { displayName, email, photoURL, uid } = userAuth;
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
      var textError ="Error Code : "+ error.code + " Message : " + error.message;
      return textError;
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

export const signInWithGoogle = async () => {
  try {
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    providerGoogle.setCustomParameters({ prompt: "select_account" });
    await auth.signInWithPopup(providerGoogle);
  } catch (error) {
    var textError ="Error Code : "+ error.code + " Message : " + error.message;
    return textError;
  }
};

export const signInWithFacebook = async () => {
  try {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    providerFacebook.setCustomParameters({ prompt: "select_account" });
    await auth.signInWithPopup(providerFacebook);
  } catch (error) {
    var textError ="Error Code : "+ error.code + " Message : " + error.message;
    return textError;
  }
};
export default firebase;
