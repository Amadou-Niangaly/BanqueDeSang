import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase-config';
import { CentreDon } from '../interfaces/centre-don';

@Injectable({
  providedIn: 'root'
})
export class CentreDonService {
 private firestore:Firestore;

  constructor() {
    //initialisation de firestore
    this.firestore=getFirestore(app);
   }
  //  obtenir les centre de dons
async getCentre() {
  const coll = collection(this.firestore, 'centreDon');
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
  //ajouter un utilisateur
  async addCentre(centreDon:CentreDon){
    try {
      const coll=collection(this.firestore,'centreDon');
      await addDoc(coll,centreDon);
      console.log('Utilisateur ajouté avec succès')
    } catch (error) {
      console.error('Erreur lors de l\'ajout du centre:', error);
      throw error;
    }
  }
  //mise a jour du centre 
  async updateCentre(id:string,centreDon:Partial<CentreDon>){
    try {
      const docRef = doc(this.firestore, 'centreDon', id);
      await updateDoc(docRef,centreDon);
      console.log('centre mis à jour avec succes')
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du centre:', error);
    throw error;
    }
  }
    //suprimer un utilisateur
    async deleteCentre(id:string){
      try {
        const docRef=doc(this.firestore,'centreDon',id);
        await deleteDoc(docRef);
        console.log('centre suprrimer avec succes')
      } catch (error) {
        console.error('erreur lors de la suppression du centre:',error)
        throw error;
      }
    }
   // Récupérer un centre par ID
   async getCentreById(id: string): Promise<CentreDon | null> {
    try {
      const docRef = doc(this.firestore, 'centreDon', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id, // Inclut l'ID
          ...docSnap.data() as Omit<CentreDon, 'id'> // Ajoute les données du document
        } as CentreDon;
      } else {
        console.log('Aucun centre trouvé avec cet ID.');
        return null; // Retourne null si le centre n'existe pas
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du centre :', error);
      throw error; // Lancer l'erreur pour la gérer en dehors de cette méthode
    }
  }
}
