import { Injectable } from '@angular/core';
import { getMessaging,getToken } from 'firebase/messaging';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private messaging;

  constructor() {
    this.messaging=getMessaging();
   }

   requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        this.getToken();
      } else {
        console.log('Notification permission denied.');
      }
    }).catch((err) => {
      console.error('Error requesting notification permission:', err);
    });
  }
  getToken(): Promise<string> {
    return getToken(this.messaging, { vapidKey: 'N7aAVIcL9M9ECX1gL6kQ03cJ9MYI_34rcc2LBfqkJ-8' })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Current token:', currentToken);
          return currentToken; // Retourner le token
        } else {
          console.log('No registration token available. Request permission to generate one.');
          return ''; // Retourner une chaîne vide si aucun token n'est disponible
        }
      }).catch((err) => {
        console.error('An error occurred while retrieving token:', err);
        return ''; // Retourner une chaîne vide en cas d'erreur
      });
}

  
}
