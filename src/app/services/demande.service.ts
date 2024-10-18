import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase-config';
import { Demande } from '../interfaces/demande';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private firestore:Firestore;
  constructor(
    private authService:AuthService,
    private notificationsService:NotificationsService
  ) {
    //initialiser firestore
    this.firestore=getFirestore(app);
   }
   //  obtenir les demandes
async getDemande() {
  const coll = collection(this.firestore, 'demande');
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
// Ajouter une demande
async addDemande(demande: Demande) {
  try {
    const coll = collection(this.firestore, 'demande');
    const docRef = await addDoc(coll, demande);
    console.log('Demande ajoutée avec succès');

    // Récupérer les tokens des utilisateurs
    const utilisateursSnapshot = await getDocs(collection(this.firestore, 'utilisateurs'));
    const tokens: string[] = [];
    
    utilisateursSnapshot.forEach((doc) => {
      const userData = doc.data();
      const token = userData['fcm_token']; // Syntaxe d'indexation corrigée
      // Ajouter le token à la liste si non nul et non vide
      if (typeof token === 'string' && token.trim() !== '') {
        tokens.push(token);
      }
    });

    if (tokens.length === 0) {
      console.log("Aucun utilisateur n'a de token FCM valide.");
      return;
    }

    // Récupérer le nom de l'utilisateur ayant créé la demande
    if (!demande.userId) {
      console.error('userId manquant pour la demande.');
      return;
    }

    const user = await this.authService.getUserData(demande.userId);
    const userName = user?.nom || 'Un utilisateur'; // Utilise le nom de l'utilisateur ou une valeur par défaut

    // Envoyer une notification à chaque utilisateur avec un token valide
    for (const token of tokens) {
      const notificationData = {
        token, // Chaque token individuellement
        title: 'Nouvelle Demande de Sang',
        body: `${userName} a fait une demande de sang pour le groupe sanguin ${demande.groupeSanguin || 'inconnu'}.`
      };

      await this.notificationsService.createDemande(notificationData);
    }

  } catch (error) {
    console.error('Erreur lors de l\'ajout de la demande:', error);
    throw error;
  }
}
  //mise a jour de la demande
  async updateDemande(id:string,demande:Partial<Demande>){
    try {
      const docRef=doc(this.firestore,'demande',id);
      await updateDoc(docRef,demande);
      console.log('demande mis à jour avec succes')
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la demande:', error);
    throw error;
    }
  }
    //suprimer une demande
    async deleteDemande(id:string){
      try {
        const docRef=doc(this.firestore,'demande',id);
        await deleteDoc(docRef);
        console.log('demande suprrimer avec succes')
      } catch (error) {
        console.error('erreur lors de la suppression de la demande',error)
        throw error;
      }
    }
   // Récupérer une demande par ID
   async getDemandeById(id: string): Promise<Demande | null> {
    try {
      const docRef = doc(this.firestore, 'demande', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id, // Inclut l'ID
          ...docSnap.data() as Omit<Demande, 'id'> // Ajoute les données du document
        } as Demande;
      } else {
        console.log('Aucune demande trouvé avec cet ID.');
        return null; // Retourne null si le centre n'existe pas
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la demande :', error);
      throw error; // Lancer l'erreur pour la gérer en dehors de cette méthode
    }
  }

  async getDemandesWithUserData(): Promise<(Demande & { user?: any })[]> {
    const coll = collection(this.firestore, 'demande');
    try {
      const snapshot = await getDocs(coll);
      const demandesWithUser = await Promise.all(snapshot.docs.map(async doc => {
        const demandeData = {
          ...doc.data() as Demande,
          id: doc.id
        };
  
        // Vérifie que 'userId' est bien défini avant de l'utiliser
        if (!demandeData.userId) {
          console.error('userId manquant pour la demande:', demandeData);
          return {
            ...demandeData,
            user: null // Ou lève une erreur, selon ce que tu veux
          };
        }
  
        // Récupère les données utilisateur
        const user = await this.authService.getUserData(demandeData.userId);
        return {
          ...demandeData,
          user
        };
      }));
      return demandesWithUser;
    } catch (error) {
      console.error('Erreur de connexion à Firebase:', error);
      throw error;
    }
  }
}