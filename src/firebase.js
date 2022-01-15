import firebase from 'firebase';


const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDy3tP-rvDeTQeGI6ceR02Gze_vy95N5tQ",
  authDomain: "werstoreroom.firebaseapp.com",
  databaseURL: "https://werstoreroom.firebaseio.com",
  projectId: "werstoreroom",
  storageBucket: "werstoreroom.appspot.com",
  messagingSenderId: "766165926646",
  appId: "1:766165926646:web:68461709837dec6c04e2d7",
  measurementId: "G-2N8MFHXFFN"
});

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  // const db = firebaseApp.database();

  export { db, auth, storage };