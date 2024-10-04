// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


 export const firebaseConfig = {
  apiKey: "AIzaSyB5fZ7jSqVLzhwp8aJ9_uTUb7Sxuloj3y4",
  authDomain: "banque-sang-8dc2b.firebaseapp.com",
  projectId: "banque-sang-8dc2b",
  storageBucket: "banque-sang-8dc2b.appspot.com",
  messagingSenderId: "549004100569",
  appId: "1:549004100569:web:ef063a06c670480fa18fc8",
  vapidkey:"BBWxHZ0iT_53R7yA6Optckw1Q1jSWL3BLsX3cY5W8PGpSo7szY2gEwE4HGeiTa6h_8WNqMiL0LPoJuG9F7Jp9qQ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

 // Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)
getToken(messaging, {vapidKey: ""});



