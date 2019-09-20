import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyC3QOJdAdSFv4D9ew5AbnXYDJi6dqCFKOE",
  authDomain: "man-city-6fe6b.firebaseapp.com",
  databaseURL: "https://man-city-6fe6b.firebaseio.com",
  projectId: "man-city-6fe6b",
  storageBucket: "man-city-6fe6b.appspot.com",
  messagingSenderId: "482626697923",
  appId: "1:482626697923:web:d60051ae1357f7c0350076"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref('matches');
const firebasePlayers = firebaseDB.ref('players');
const firebasePromotions = firebaseDB.ref('promotions');
const firebaseTeams = firebaseDB.ref('teams');


export {
  firebase,
  firebaseMatches,
  firebasePlayers,
  firebasePromotions,
  firebaseTeams,
  firebaseDB
}