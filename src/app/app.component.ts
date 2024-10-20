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
  messaging = getMessaging(); // Correction de l'initialisation

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.requestPermission();
  }

  requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Obtenez le token FCM
        getToken(this.messaging, { vapidKey: firebaseConfig.vapidkey}).then((currentToken) => { // Utilisation correcte de firebaseConfig
          if (currentToken) {
            console.log('Token de notification:', currentToken);
            // Envoyez ce token à votre serveur pour l'utiliser dans l'envoi de notifications
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
    this.notificationsService.init();
  }
  
}