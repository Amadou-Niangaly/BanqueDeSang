import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseConfig } from './config/firebase-config';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Correction de 'styleUrl' en 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'BS-Frontend';

  ngOnInit(): void {
    this.requestPermission();
  }

  requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.retrieveFCMToken(); // Appel pour récupérer le token FCM
      } else {
        console.log('Notification permission denied.');
      }
    }).catch((err) => {
      console.error('Error while requesting notification permission:', err);
    });
  }

  // Méthode pour récupérer le token FCM
  retrieveFCMToken() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: firebaseConfig.vapidkey }) // Utilise la clé VAPID correcte ici
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token de notification:', currentToken);
          // Ici, tu peux envoyer le token à ton serveur ou le stocker
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token: ', err);
      });
  }
}
