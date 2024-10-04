import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '../config/firebase-config';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private messaging;

  constructor() {
    this.messaging = getMessaging();
    this.init(); // Initialiser l'écouteur de messages
  }

  init() {
    onMessage(this.messaging, (payload) => {
      console.log('Message reçu. ', payload);
      
      // Vérifiez si le payload contient une notification
      if (payload.notification) {
        // Utilisez les propriétés de notification uniquement si elles existent
        const title = payload.notification.title || 'Notification';
        const body = payload.notification.body || 'Vous avez reçu une nouvelle notification.';
        
        this.showNotification(title, body);
      } else {
        console.warn('Notification manquante dans le payload:', payload);
      }
    });
  }

  // Méthode pour demander la permission de recevoir des notifications et obtenir le token
  requestPermission() {
    return new Promise((resolve, reject) => {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          getToken(this.messaging, { vapidKey: firebaseConfig.vapidkey })
            .then((currentToken) => {
              if (currentToken) {
                console.log('Token de notification:', currentToken);
                resolve(currentToken);
              } else {
                console.log('No registration token available. Request permission to generate one.');
                reject('No registration token available.');
              }
            })
            .catch((err) => {
              console.error('An error occurred while retrieving token: ', err);
              reject(err);
            });
        } else {
          console.log('Unable to get permission to notify.');
          reject('Permission denied.');
        }
      });
    });
  }

  // Méthode pour envoyer une notification
  async createDemande(notificationData: { token: string; title: string; body: string; }) {
    try {
      const response = await fetch('http://localhost:3000/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi de la notification: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Notification envoyée avec succès:', responseData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  }

  showNotification(title: string, body: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'path/to/icon.png' // Remplacez par le chemin vers votre icône
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, {
            body: body,
            icon: 'path/to/icon.png' // Remplacez par le chemin vers votre icône
          });
        }
      });
    }
  }
}
