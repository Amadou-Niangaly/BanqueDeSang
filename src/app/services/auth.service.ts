import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase-config';
import { BehaviorSubject } from 'rxjs';
import { Utilisateur } from '../interfaces/utilisateur';
import { getMessaging, getToken } from 'firebase/messaging'; // Importer FCM

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const messaging = getMessaging(app); // Initialiser FCM

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private userDataSubject = new BehaviorSubject<Utilisateur | null>(null); 

  constructor() {
     onAuthStateChanged(auth, async (user) => {
      this.userSubject.next(user); // Mettre à jour le sujet avec l'utilisateur actuel
      if (user) {
        console.log('Utilisateur connecté:', user);
        const userData = await this.getUserData(user.uid); // Récupérer les données de l'utilisateur
        this.userDataSubject.next(userData); // Mettre à jour le sujet avec les données de l'utilisateur
        this.updateFCMToken(user.uid); // Mettre à jour le token FCM de l'utilisateur
      } else {
        console.log('Aucun utilisateur connecté');
        this.userDataSubject.next(null); // Réinitialiser les données de l'utilisateur
      }
    });
  }

  // Méthode pour obtenir et mettre à jour le token FCM
  private async updateFCMToken(uid: string) {
    try {
      const fcmToken = await getToken(messaging, { vapidKey: firebaseConfig.apiKey });
      if (fcmToken) {
        console.log('Token FCM obtenu:', fcmToken);

        // Mettre à jour le token dans Firestore
        const userDoc = doc(firestore, 'utilisateurs', uid);
        await updateDoc(userDoc, { fcm_token: fcmToken });
        console.log('Token FCM mis à jour dans Firestore');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du token FCM:', error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  async signup(email: string, password: string): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Inscription réussie:', userCredential.user);

      // Déconnecter immédiatement après la création
      await signOut(auth);
      console.log('Utilisateur déconnecté immédiatement après l\'inscription');
      
      return userCredential.user;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log('Déconnexion réussie');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  }

  // Récupérer l'ID de l'utilisateur connecté
  getCurrentUserId(): string | null {
    const user = this.userSubject.getValue(); // Obtenez l'utilisateur actuel du sujet
    return user ? user.uid : null; // Retourne l'ID de l'utilisateur ou null
  }

  getUser() {
    return this.userSubject.asObservable(); // Retourne l'observable des utilisateurs
  }

  // Récupération des informations de l'utilisateur connecté
  getUserDataObservable() {
    return this.userDataSubject.asObservable(); // Retourne l'observable des données de l'utilisateur
  }

  async getUserData(uid: string): Promise<Utilisateur | null> {
    console.log('Récupération des données pour l\'UID:', uid);
    const userDoc = doc(firestore, 'utilisateurs', uid);
    const userSnapshot = await getDoc(userDoc);
    
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data() as Utilisateur;
      userData.id = uid;
      console.log('Données utilisateur récupérées:', userData);
      return userData;
    } else {
      console.log('Aucun utilisateur trouvé dans Firestore');
      return null;
    }
  }
}
