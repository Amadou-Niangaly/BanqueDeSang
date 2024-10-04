// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');

// Initialisez Firebase avec la configuration
firebase.initializeApp({
    apiKey: "AIzaSyB5fZ7jSqVLzhwp8aJ9_uTUb7Sxuloj3y4",
    authDomain: "banque-sang-8dc2b.firebaseapp.com",
    projectId: "banque-sang-8dc2b",
    storageBucket: "banque-sang-8dc2b.appspot.com",
    messagingSenderId: "549004100569",
    appId: "1:549004100569:web:ef063a06c670480fa18fc8"
});

const messaging = firebase.messaging();
