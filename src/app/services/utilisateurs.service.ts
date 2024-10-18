import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app, firebaseConfig } from '../config/firebase-config';
import { Utilisateur } from '../interfaces/utilisateur';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private firestore: Firestore;
  private auth = getAuth(app);

  constructor() { 
    this.firestore = getFirestore(app); // Initialiser Firestore ici
  }
// Méthode pour obtenir tous les utilisateurs
async getUtilisateurs(): Promise<Utilisateur[]> {
  const coll = collection(this.firestore, 'utilisateurs');
  try {
    const snapshot = await getDocs(coll);
    return snapshot.docs.map(doc => {
      const data = doc.data() as Omit<Utilisateur, 'id'>; // Exclure 'id' de l'objet Utilisateur
      return {
        id: doc.id, // Inclut l'ID du document
        ...data // Ajoute les données du document sans id
      };
    });
  } catch (error) {
    console.error('Erreur de connexion à Firebase:', error);
    throw error;
  }
}
  
async addUtilisateur(utilisateur: Utilisateur): Promise<void> {
  try {
    // Créez un nouvel utilisateur dans Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(this.auth, utilisateur.email, utilisateur.password);

    // Créez un document avec l'UID comme identifiant
    const userDocRef = doc(this.firestore, 'utilisateurs', userCredential.user.uid);
    
    // Vérifie que le fcm_token est défini, sinon assigne une valeur par défaut
    const fcmToken = utilisateur.fcm_token || ''; // Ou null, selon tes besoins

    // Assurez-vous que toutes les données nécessaires sont présentes
    await setDoc(userDocRef, {
      id: userCredential.user.uid,
      email: utilisateur.email,
      nom: utilisateur.nom,
      prenom: utilisateur.prenom,
      dateNaissance: utilisateur.dateNaissance,
      numeroTelephone: utilisateur.numeroTelephone,
      localisation: utilisateur.localisation,
      role: utilisateur.role,
      groupeSanguin: utilisateur.groupeSanguin,
      fcm_token: fcmToken, // Utilise la valeur vérifiée ici
      centreId: utilisateur.centreId || '',
      hopitalId: utilisateur.hopitalId || ''
    });

    console.log('Utilisateur ajouté avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    throw error;
  }
}


  // mise a jour d'un utilisateur
  async updateUtilisateur(id:string,utilisateur:Partial<Utilisateur>){
    try {
      const docRef=doc(this.firestore,'utilisateurs',id);
      await updateDoc(docRef,utilisateur);
      console.log('utilisateur mis à jour avec succes')
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    throw error;
    }
  }
  //suprimer un utilisateur
  async deleteUtilisateur(id:string){
    try {
      const docRef=doc(this.firestore,'utilisateurs',id);
      await deleteDoc(docRef);
      console.log('utilisateur suprrimer avec succes')
    } catch (error) {
      console.error('erreur lors de la suppression de l\'utilisateur:',error)
      throw error;
    }
  }
  // Récupérer un utilisateur par ID
  async getUtilisateurById(id: string): Promise<Utilisateur | null> {
    try {
      const docRef = doc(this.firestore, 'utilisateurs', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id, // Inclut l'ID
          ...docSnap.data() as Omit<Utilisateur, 'id'> // Ajoute les données du document
        } as Utilisateur;
      } else {
        console.log('Aucun utilisateur trouvé avec cet ID.');
        return null; // Retourne null si l'utilisateur n'existe pas
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      throw error; // Lancer l'erreur pour la gérer en dehors de cette méthode
    }
  }
  async getUtilisateurByEmail(email: string): Promise<Utilisateur | null> {
    console.log("Requête pour utilisateur avec email: ", email);
  
    const utilisateurRef = collection(this.firestore, 'utilisateurs');
    const q = query(utilisateurRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      const utilisateurData = querySnapshot.docs[0].data() as Utilisateur;
      utilisateurData.id = querySnapshot.docs[0].id; // Récupère l'ID du document
      console.log("Utilisateur trouvé dans Firestore: ", utilisateurData);
      return utilisateurData;
    } else {
      console.log("Aucun utilisateur trouvé dans Firestore avec cet email.");
      return null;
    }
  }
  
}
