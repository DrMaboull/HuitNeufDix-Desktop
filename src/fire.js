import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyAEmyharILrgtF8tLi7k5vaRSyEDPCh26c",
    authDomain: "huitneufdix-123456.firebaseapp.com",
    databaseURL: "https://huitneufdix-123456.firebaseio.com",
    projectId: "huitneufdix-123456",
    storageBucket: "",
    messagingSenderId: "122149889685"
};
var fire = firebase.initializeApp(config);
export default fire;