export interface Utilisateur {
    id: string; 
    nom?: string; 
    prenom?: string;
    email: string; 
    role: 'admin' | 'admin centre' | 'admin hopital';
    typeEntite?: 'Hôpital' | 'Centre de Don'; // Type d'entité (facultatif)
    groupeSanguin?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Groupe sanguin
    localisation?: string; 
    dateDernierDon?: Date; 
    nombreDons?: number; 
    statutVerification?: 'Vérifié' | 'Non vérifié'; 
    numeroTelephone?: string; 
    hopitalId?: string; // Référence à l'hôpital si applicable
    centreId?: string; // Référence au centre de don si applicable
    password:string;
    dateNaissance?:string;
    fcm_token?: string;
}
