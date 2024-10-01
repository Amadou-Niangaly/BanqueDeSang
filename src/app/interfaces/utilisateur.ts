export interface Utilisateur {
    id: string; 
    nom?: string; 
    prenom?: string;
    email: string; 
    role?: 'Donneur' | 'Patient' | 'Admin' | 'Hôpital' | 'Centre'; 
    typeEntite?: 'Hôpital' | 'Centre de Don'; // Type d'entité (facultatif)
    groupeSanguin?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'; // Groupe sanguin
    localisation?: string; 
    dateDernierDon?: Date; 
    nombreDons?: number; 
    statutVerification?: 'Vérifié' | 'Non vérifié'; 
    telephone?: string; 
    hopitalId?: string; // Référence à l'hôpital si applicable
    centreId?: string; // Référence au centre de don si applicable
    password:string;
    dateNaissance?:string;
}
