export interface Demande {
    id:string;
    userId?: string; // Rendre userId optionnel
    groupeSanguin?:string;
    quantite?:string;
    dateDemande?:string;
    status?:string;
    urgence?:string;
   
}
