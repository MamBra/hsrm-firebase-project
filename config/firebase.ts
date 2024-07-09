// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';
import 'firebase/auth';

console.log(Constants.expoConfig?.extra);


const firebaseConfig1 = {
  apiKey: Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Constants.expoConfig?.extra?.firebaseAuthDomain,
  databaseURL: Constants.expoConfig?.extra?.firebaseDatabaseURL,
  projectId: Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Constants.expoConfig?.extra?.firebaseMeasurementId
};


const firebaseConfig = {
  apiKey: "AIzaSyAfGgnBqdSGC2l2fxnybYsYXaYKqGXEftc",
  authDomain: "hsrm-firebase-project.firebaseapp.com",
  databaseURL: "https://hsrm-firebase-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hsrm-firebase-project",
  storageBucket: "hsrm-firebase-project.appspot.com",
  messagingSenderId: "544863251593",
  appId: "1:544863251593:web:f307a96fa11a8badf32a58",
  measurementId: "G-EQ6BYY7Q2N"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;