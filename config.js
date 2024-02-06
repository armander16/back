const firebase = require("firebase");

const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain:process.env.DOMAIN,
  projectId: process.env.ID,
  storageBucket: process.env.STORAGE,
  messagingSenderId: process.env.SENDER,
  appId: process.env.APP,
  measurementId: process.env.MEASURE,
};

console.log(process.env.MEASURE)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("User");
module.exports = User;
