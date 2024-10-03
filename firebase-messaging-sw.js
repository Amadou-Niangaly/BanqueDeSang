// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

 export const firebaseConfig = {
  apiKey: "AIzaSyB5fZ7jSqVLzhwp8aJ9_uTUb7Sxuloj3y4",
  authDomain: "banque-sang-8dc2b.firebaseapp.com",
  projectId: "banque-sang-8dc2b",
  storageBucket: "banque-sang-8dc2b.appspot.com",
  messagingSenderId: "549004100569",
  appId: "1:549004100569:web:ef063a06c670480fa18fc8",
  
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Message received. ', payload);
    // Personnalisez la notification ici
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/path/to/icon.png' // Chemin vers une icône
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
