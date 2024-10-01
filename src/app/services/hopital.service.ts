import { Injectable } from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { app } from '../config/firebase-config';
import { Hopital } from '../interfaces/hopital';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {
  private firestore:Firestore;
  constructor() {
    //initialisation de firebase
    this.firestore=getFirestore(app);
   }
    //  obtenir les centre de dons
async getHopital() {
  const coll = collection(this.firestore, 'hopitaux');
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
  async addHopital(hopital:Hopital){
    try {
      const coll=collection(this.firestore,'hopitaux');
      await addDoc(coll,hopital);
      console.log('Hopital ajouté avec succès')
    } catch (error) {
      console.error('Erreur lors de l\'ajout du centre:', error);
      throw error;
    }
  }
  //mise a jour du centre 
  async updateHopital(id:string,hopital:Partial<Hopital>){
    try {
      const docRef=doc(this.firestore,'hopitaux',id);
      await updateDoc(docRef,hopital);
      console.log('Hopital mis à jour avec succes')
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'hopital:', error);
    throw error;
    }
  }
    //suprimer un utilisateur
    async deleteHopital(id:string){
      try {
        const docRef=doc(this.firestore,'hopitaux',id);
        await deleteDoc(docRef);
        console.log('centre suprrimer avec succes')
      } catch (error) {
        console.error('erreur lors de la suppression de l\'hopital:',error)
        throw error;
      }
    }
   // Récupérer un centre par ID
   async getHopitalById(id: string): Promise<Hopital | null> {
    try {
      const docRef = doc(this.firestore, 'hopitaux', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id, // Inclut l'ID
          ...docSnap.data() as Omit<Hopital, 'id'> // Ajoute les données du document
        } as Hopital;
      } else {
        console.log('Aucun hopital trouvé avec cet ID.');
        return null; // Retourne null si le centre n'existe pas
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'hopital :', error);
      throw error; // Lancer l'erreur pour la gérer en dehors de cette méthode
    }
  }
}
