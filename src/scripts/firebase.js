import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAtjxLhxAmpjg6uVW7t_FRLJNQcQqFCnU",
    authDomain: "thinkmindful-56abf.firebaseapp.com",
    databaseURL: "https://thinkmindful-56abf.firebaseio.com",
    projectId: "thinkmindful-56abf",
    storageBucket: "thinkmindful-56abf.appspot.com",
    messagingSenderId: "788742561451",
    appId: "1:788742561451:web:26a12049a797c242cae1ee",
    measurementId: "G-ZMWLLB8VCL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;