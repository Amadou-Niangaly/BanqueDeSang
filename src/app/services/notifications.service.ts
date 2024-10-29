import { Injectable } from '@angular/core';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from '../config/firebase-config';
import { collection, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc, } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Observable } from 'rxjs';

// Initialisez l'application Firebase
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messaging;
  private firestore: Firestore;

  constructor() {
    this.firestore = getFirestore(app); // Assurez-vous que 'app' est correctement initialisé
    this.messaging = getMessaging(app);
    this.init(); // Initialiser l'écouteur de messages
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

  // Demande de permission pour les notifications
  async requestPermission() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.getToken(); // Obtenir le token après avoir accordé la permission
      } else {
        console.warn('Permission de notification refusée');
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error);
    }
  }

  // Obtenir le jeton FCM
 // notifications.service.ts
async getToken(): Promise<string | null> {
  try {
    const currentToken = await getToken(this.messaging);
    if (currentToken) {
      console.log('Token FCM récupéré:', currentToken);
      return currentToken; // Retourner le token FCM
    } else {
      console.log('Aucun token FCM disponible. Demandez l\'autorisation pour générer un token.');
      return null; // Retourner null si aucun token n'est disponible
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du token FCM:', error);
    return null; // Retourner null en cas d'erreur
  }

}


  // Mise à jour du token FCM de l'utilisateur
  async updateFCMToken(uid: string, fcmToken: string) {
    try {
      console.log('Token FCM obtenu:', fcmToken);
  
      // Obtenir le document de l'utilisateur depuis Firestore
      const userDoc = doc(this.firestore, 'utilisateurs', uid);
      const userSnapshot = await getDoc(userDoc);
  
      // Vérifier si le token FCM existant est le même
      const existingToken = userSnapshot.exists() ? userSnapshot.data()['fcm_token'] : null;
  
      if (existingToken !== fcmToken) {
        // Mettre à jour Firestore avec le nouveau token
        await updateDoc(userDoc, { fcm_token: fcmToken });
        console.log('Token FCM mis à jour dans Firestore');
      } else {
        console.log('Le token FCM est déjà à jour.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du token FCM:', error);
    }
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
        const errorDetails = await response.json();
        throw new Error(`Erreur lors de l'envoi de la notification: ${response.statusText} - ${errorDetails.message}`);
      }
  
      const responseData = await response.json();
      console.log('Notification envoyée avec succès:', responseData);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification:', error);
    }
  }
  
   //  obtenir les demandes
   async getNotifications() {
    const coll = collection(this.firestore, 'notifications');
    try {
      const snapshot = await getDocs(coll);
      return snapshot.docs.map(doc => ({
        id: doc.id, // Inclut l'ID du document
        ...doc.data() // Ajoute les données du document
      }));
    } catch (error) {
      console.error('Erreur de connexion à Firebase:', error);
      throw error;
    }
  }
  // Afficher une notification
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
