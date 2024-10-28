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
    this.checkNotificationPermission(); // Vérifier la permission de notification au démarrage
  }

  init() {
    onMessage(this.messaging, (payload) => {
      console.log('Message reçu: ', payload);
      
      // Vérifiez si le payload contient une notification
      if (payload.notification) {
        const title = payload.notification.title || 'Notification';
        const body = payload.notification.body || 'Vous avez reçu une nouvelle notification.';
        
        this.showNotification(title, body);
      } else {
        console.warn('Notification manquante dans le payload:', payload);
      }
    });
  }

  // Méthode pour vérifier la permission de notification et obtenir le token
  async checkNotificationPermission(): Promise<string> {
    if (Notification.permission === 'granted') {
      console.log('Permission déjà accordée.');
      return this.getToken();
    } else if (Notification.permission === 'denied') {
      console.log('Permission refusée. Les notifications ne peuvent pas être envoyées.');
      return Promise.reject('Permission refusée');
    } else {
      return this.requestPermission(); // Demande la permission
    }
  }

  // Méthode pour demander la permission de recevoir des notifications
  public requestPermission(): Promise<string> {
    return new Promise((resolve, reject) => {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permission de notification accordée.');
          resolve(this.getToken()); // Obtient le token FCM si la permission est accordée
        } else {
          console.log('Permission de notification refusée.');
          reject('Permission refusée');
        }
      }).catch((err) => {
        console.error('Erreur lors de la demande de permission:', err);
        reject(err);
      });
    });
  }

  // Méthode pour obtenir le token FCM
  public getToken(): Promise<string> {
    return getToken(this.messaging, { vapidKey: firebaseConfig.vapidkey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Token de notification:', currentToken);
          // Ici, tu peux sauvegarder le token dans Firestore
          return currentToken;
        } else {
          console.log('Aucun token d\'inscription disponible. Demandez la permission pour en générer un.');
          return Promise.reject('Aucun token disponible.');
        }
      })
      .catch((err) => {
        console.error('Une erreur est survenue lors de la récupération du token:', err);
        return Promise.reject(err);
      });
  }

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
        const errorDetails = await response.json(); // Récupérer les détails de l'erreur
        throw new Error(`Erreur lors de l'envoi de la notification: ${response.statusText} - ${errorDetails.message}`);
      }
  
      const responseData = await response.json();
      console.log('Notification envoyée avec succès:', responseData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
      // Gérer l'erreur ici, par exemple, en informant l'utilisateur ou en supprimant le token si nécessaire
    }
  }
  
  // Méthode pour afficher une notification
  showNotification(title: string, body: string) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'assets/joolidi.png' // Remplacez par le chemin vers votre icône
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, {
            body: body,
            icon: 'assets/joolidi.png' // Remplacez par le chemin vers votre icône
          });
        }
      });
    }
  }
}
