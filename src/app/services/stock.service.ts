import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { app } from '../config/firebase-config';
import { Stock } from '../interfaces/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
private firestore :Firestore;
  constructor() { 
    this.firestore=getFirestore(app);
  }

  //  obtenir les stocks 
async getStock() {
  const coll = collection(this.firestore, 'stock');
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
  //ajouter un stock
  async addStock(stock:Stock){
    try {
      const coll=collection(this.firestore,'stock');
      await addDoc(coll,stock);
      console.log('stock ajouté avec succès')
    } catch (error) {
      console.error('Erreur lors de l\'ajout du stock:', error);
      throw error;
    }
  }
  //mise a jour du stock
  async updateStock(id:string,stock:Partial<Stock>){
    try {
      const docRef = doc(this.firestore, 'stock', id);
      await updateDoc(docRef,stock);
      console.log('stock mis à jour avec succes')
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stock:', error);
    throw error;
    }
  }
    //suprimer un stock
    async deleteStock(id:string){
      try {
        const docRef=doc(this.firestore,'stock',id);
        await deleteDoc(docRef);
        console.log('stock suprrimer avec succes')
      } catch (error) {
        console.error('erreur lors de la suppression du stock:',error)
        throw error;
      }
    }
   // Récupérer un stock par ID
   async getStockById(id: string): Promise<Stock | null> {
    try {
      const docRef = doc(this.firestore, 'stock', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id, // Inclut l'ID
          ...docSnap.data() as Omit<Stock, 'id'> // Ajoute les données du document
        } as Stock;
      } else {
        console.log('Aucun stock trouvé avec cet ID.');
        return null; // Retourne null si le stock n'existe pas
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du stock:', error);
      throw error; // Lancer l'erreur pour la gérer en dehors de cette méthode
    }
  }
  //recuperations des centres
  async getCentres() {
    const centreDonColl = collection(this.firestore, 'centreDon');
    const hopitalColl = collection(this.firestore, 'hopital');
  
    try {
      const [centresSnapshot, hopitauxSnapshot] = await Promise.all([
        getDocs(centreDonColl),
        getDocs(hopitalColl)
      ]);
  
      const centres = centresSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'centreDon', // Indiquer que c'est un centre de don
        ...doc.data()
      }));
  
      const hopitaux = hopitauxSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'hopital', // Indiquer que c'est un hôpital
        ...doc.data()
      }));
  
      return [...centres, ...hopitaux]; // Combine les deux listes
    } catch (error) {
      console.error('Erreur de récupération des centres:', error);
      throw error;
    }
  }
  // Récupérer les stocks par centre
  async getStockByCentre(centreId: string) {
    const coll = collection(this.firestore, 'stock');
    const q = query(coll, where('centreId', '==', centreId)); // Remplacez 'centreId' par le champ approprié dans votre modèle de données

    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id, // Inclut l'ID du document
        ...doc.data(), // Ajoute les données du document
      })) as Stock[]; // Assurez-vous que les données correspondent à l'interface Stock
    } catch (error) {
      console.error('Erreur lors de la récupération des stocks par centre:', error);
      throw error;
    }
  }

  // Récupérer les stocks par hôpital
  async getStockByHopital(hopitalId: string) {
    const coll = collection(this.firestore, 'stock');
    const q = query(coll, where('hopitalId', '==', hopitalId)); // Remplacez 'hopitalId' par le champ approprié dans votre modèle de données

    try {
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id, // Inclut l'ID du document
        ...doc.data(), // Ajoute les données du document
      })) as Stock[]; // Assurez-vous que les données correspondent à l'interface Stock
    } catch (error) {
      console.error('Erreur lors de la récupération des stocks par hôpital:', error);
      throw error;
    }
  }
}
