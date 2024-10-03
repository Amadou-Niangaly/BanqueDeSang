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
  
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

 // Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
// Add the public key generated from the console here.
// Add the public key generated from the console here.
getToken(messaging, {vapidKey: "N7aAVIcL9M9ECX1gL6kQ03cJ9MYI_34rcc2LBfqkJ-8"});


