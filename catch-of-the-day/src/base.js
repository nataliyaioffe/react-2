import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQiBZQfopdOa_6_h2qQgQcpPPcmR_djSY",
  authDomain: "catch-of-the-day-e8c8e.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-e8c8e.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export { firebaseApp };

/// default export

export default base;