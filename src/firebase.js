import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyC3QOJdAdSFv4D9ew5AbnXYDJi6dqCFKOE",
  authDomain: "man-city-6fe6b.firebaseapp.com",
  databaseURL: "https://man-city-6fe6b.firebaseio.com",
  projectId: "man-city-6fe6b",
  storageBucket: "",
  messagingSenderId: "482626697923",
  appId: "1:482626697923:web:d60051ae1357f7c0350076"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');

export {
  firebase,
  firebaseMatches
}