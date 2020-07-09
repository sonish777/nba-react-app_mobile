import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCsPa8oTexrdTRZb8SnKg7pFsjMLQPyH20",
  authDomain: "nba-react-app-37f10.firebaseapp.com",
  databaseURL: "https://nba-react-app-37f10.firebaseio.com",
  projectId: "nba-react-app-37f10",
  storageBucket: "nba-react-app-37f10.appspot.com",
  messagingSenderId: "315752424962",
  appId: "1:315752424962:web:bc5a113522a0949c0d291b",
  measurementId: "G-ZGH9ME2KEG",
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref("articles");
const firebaseTeams = firebaseDB.ref("teams");
const firebaseVideos = firebaseDB.ref("videos");

const firebaseLooper = (snapshot) => {
  const data = [];
  // console.log("INSIDE");
  snapshot.forEach((childSnapshot) => {
    // console.log(childSnapshot.val());
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key,
    });
  });

  return data;
};

export {
  firebase,
  firebaseDB,
  firebaseArticles,
  firebaseTeams,
  firebaseVideos,
  firebaseLooper,
};
