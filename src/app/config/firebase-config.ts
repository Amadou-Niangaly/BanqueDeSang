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
  vapidkey:"BJX95_v8pC81FjOq4dQWuEQy0y7O-ZQYIzJcbcFuCuUcK8K0qV_bayZ3mcDTL7_inmBKrvrKHSqK4tQkrNUB3Xs"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);

 // Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

// Add the public key generated from the console here.
getToken(messaging, { vapidKey: 'BJX95_v8pC81FjOq4dQWuEQy0y7O-ZQYIzJcbcFuCuUcK8K0qV_bayZ3mcDTL7_inmBKrvrKHSqK4tQkrNUB3Xs' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    console.log(currentToken);
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});






