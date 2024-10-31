import { Injectable } from '@angular/core';
import { app } from '../config/firebase-config';
import { addDoc, collection, deleteDoc, doc, Firestore, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Maladie } from '../interfaces/maladie';

@Injectable({
  providedIn: 'root'
})
export class MaladieService {
  private firestore:Firestore;
  private storage=getStorage(app);

  constructor() {
    this.firestore=getFirestore(app);
   }
   // Méthode pour ajouter une maladie
   async ajouterMaladie(maladie: Maladie, photoFile: File): Promise<void> {
    const id = doc(collection(this.firestore, 'maladies')).id; // Crée un ID unique
    maladie.id = id; // Ajoute l'ID à l'objet maladie

    // Upload de la photo dans Firebase Storage
    const photoRef = ref(this.storage, `maladies/${id}`); // Chemin de stockage dans Firebase
    await uploadBytes(photoRef, photoFile);
    const photoURL = await getDownloadURL(photoRef);
    maladie.photo = photoURL; // Enregistre l'URL de la photo dans Firestore

    // Enregistre la maladie dans Firestore avec l'ID et la photo
    await setDoc(doc(this.firestore, 'maladies', id), maladie);
  }

  // Méthode pour modifier une maladie
  async modifierMaladie(id: string, maladie: Partial<Maladie>): Promise<void> {
    try {
      const maladieDocRef = doc(this.firestore, `maladies/${id}`);
      await updateDoc(maladieDocRef, maladie);
      console.log('Maladie modifiée avec succès !');
    } catch (error) {
      console.error("Erreur lors de la modification de la maladie :", error);
    }
  }
  async uploadPhoto(file: File): Promise<string> {
    const storageRef = ref(this.storage, `maladies/${file.name}`);
    await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
    const downloadURL = await getDownloadURL(storageRef); // Get the download URL
    return downloadURL; // Return the URL to be saved in Firestore
  }
  // Méthode pour supprimer une maladie
  async supprimerMaladie(id: string): Promise<void> {
    try {
      const maladieDocRef = doc(this.firestore, `maladies/${id}`);
      await deleteDoc(maladieDocRef);
      console.log('Maladie supprimée avec succès !');
    } catch (error) {
      console.error("Erreur lors de la suppression de la maladie :", error);
    }
  }
}
