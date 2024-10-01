import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase-config';
import { Don } from '../interfaces/don';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DonService {
  private firestore:Firestore;
  constructor(private authService:AuthService) { 
    this.firestore =getFirestore(app);
  }
   //  obtenir les dons
async getDon() {
  const coll = collection(this.firestore, 'don');
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
  //ajouter un don
  async addDon(don:Don){
    try {
      const coll=collection(this.firestore,'don');
      await addDoc(coll,don);
      console.log('Don ajouté avec succès')
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la demande:', error);
      throw error;
    }
  }
  //mise a jour d'un don 
  async updateDon(id:string,don:Partial<Don>){
    try {
      const docRef=doc(this.firestore,'don',id);
      await updateDoc(docRef,don);
      console.log('don mis à jour avec succes')
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du don:', error);
    throw error;
    }
  }
    //suprimer un don
    async deleteDon(id:string){
      try {
        const docRef=doc(this.firestore,'don',id);
        await deleteDoc(docRef);
        console.log('demande suprrimer avec succes')
      } catch (error) {
        console.error('erreur lors de la suppression de la demande',error)
        throw error;
      }
    }
   // Récupérer un don par ID
   async getDonById(id: string): Promise<Don | null> {
    try {
      const docRef = doc(this.firestore, 'don', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id, // Inclut l'ID
          ...docSnap.data() as Omit<Don, 'id'> // Ajoute les données du document
        } as Don;
      } else {
        console.log('Aucun don trouvé avec cet ID.');
        return null; // Retourne null si le centre n'existe pas
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du don :', error);
      throw error; // Lancer l'erreur pour la gérer en dehors de cette méthode
    }
  }
  //recuperer le don evac les informations de user
  async getDonsWithUserData(): Promise<(Don & { user?: any })[]> {
    const coll = collection(this.firestore, 'don');
    try {
      const snapshot = await getDocs(coll);
      const donsWithUser = await Promise.all(snapshot.docs.map(async doc => {
        const donData = {
          ...doc.data() as Don,
          id: doc.id
        };
  
        // Vérifie que 'userId' est bien défini avant de l'utiliser
        if (!donData.userId) {
          console.error('userId manquant pour le don:', donData);
          return {
            ...donData,
            user: null // Ou lève une erreur, selon ce que tu veux
          };
        }
  
        // Récupère les données utilisateur
        const user = await this.authService.getUserData(donData.userId);
        return {
          ...donData,
          user
        };
      }));
      return donsWithUser;
    } catch (error) {
      console.error('Erreur de connexion à Firebase:', error);
      throw error;
    }
  }
}
