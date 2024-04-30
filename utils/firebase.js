import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDF2-9MP1maeaIgIST14__YdebSnhz5yoQ",
  authDomain: "desafioitau-421805.firebaseapp.com",
  projectId: "desafioitau-421805",
  storageBucket: "desafioitau-421805.appspot.com",
  messagingSenderId: "1019765851759",
  appId: "1:1019765851759:web:1ac8a2da5e2332d1526f9a",
  measurementId: "G-YF8WVP54NH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };
export default firebase;