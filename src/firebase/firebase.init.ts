//  Todo: configure this sdk

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBXPw-ZZLi0LUgjwGxT_iWIewYm7BtB9h0",
  authDomain: "pixprocoder-14065.firebaseapp.com",
  projectId: "pixprocoder-14065",
  storageBucket: "pixprocoder-14065.appspot.com",
  messagingSenderId: "849011561446",
  appId: "1:849011561446:web:f34933197c7022abe73c27",
  measurementId: "G-F748G1TSPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
