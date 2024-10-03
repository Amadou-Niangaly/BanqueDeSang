import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SerchSectionComponent } from "../serch-section/serch-section.component";
import { Don } from '../../interfaces/don';
import { Utilisateur } from '../../interfaces/utilisateur';
import { DonService } from '../../services/don.service';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { CommonModule } from '@angular/common';
import { CentreDon } from '../../interfaces/centre-don';
import { CentreDonService } from '../../services/centre-don.service';
import { Hopital } from '../../interfaces/hopital';
import { StockService } from '../../services/stock.service';
import { HopitalService } from '../../services/hopital.service';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-dons',
  standalone: true,
  imports: [RouterLink, SerchSectionComponent,CommonModule,FilterPipe],
  templateUrl: './dons.component.html',
  styleUrl: './dons.component.css'
})
export class DonsComponent implements OnInit{
  don:Don[]=[];
  donsWithUser: (Don & { user?: any })[] = [];
  utilisateur:Utilisateur[]=[];
  centre:CentreDon[]=[];
  hopital:Hopital[]=[];
  searchText:any;
  constructor(
    private donService:DonService,
    private utilisateurService:UtilisateursService,
    private centreDonService:CentreDonService,
    private hopitalService:HopitalService
  ){ }
  ngOnInit(): void {
      this.loadDon();
      this.loadUtilisateur();
      this.loadCentre();
      this.loadDonsWithUserData();
      this.loadHopital();
  }
  //charger les hopitaux
  async loadHopital() {
    try {
      this.hopital=await this.hopitalService.getHopital();
      console.log("les hopitaux",this.hopital);
    } catch (error) {
      console.error("Erreur lors du chargement des hopitaux",error);
    }
  }
  //charger les centres
  async loadCentre() {
    try {
      this.centre= await this.centreDonService.getCentre();
      console.log("liste des centre",this.centre);
    } catch (error) {
      console.error('erreur lors du chargement des centres',error)
    }
  }
  //charger les utilisateurs
   async loadUtilisateur() {
      try {
      this.utilisateur = await this.utilisateurService.getUtilisateurs();
      console.log("liste des user",this.utilisateur);
    } catch (error) {
      console.error('erreur lors du chargement des utilisateurs',error)
    }
  }
  //charger les dons
   async loadDon() {
    try {
      this.don = await this.donService.getDon();
      console.log("liste des user",this.don);
    } catch (error) {
      console.error('erreur lors du chargement des dons',error)
    }
  }
  //charger les dons avec l'utilisateurs
  async loadDonsWithUserData() {
    try {
      this.donsWithUser = await this.donService.getDonsWithUserData();
    } catch (error) {
      console.error('Erreur lors du chargement des demandes avec utilisateur:', error);
    }
  }
  //recuperer le nom du  centre
  getCentreOrHopitalName(centreId: string | undefined): string {
    if (!centreId) {
      return 'Inconnu'; // Retourne 'Inconnu' si centreId est undefined
    }
  
    const centre = this.centre.find(c => c.id === centreId);
    if (centre) {
      return centre.nom || 'Inconnu'; // Retourne le nom du centre ou 'Inconnu' si nom est undefined
    }
  
    const hopital = this.hopital.find(h => h.id === centreId);
    if (hopital) {
      return hopital.nom || 'Inconnu'; // Retourne le nom de l'hôpital ou 'Inconnu' si nom est undefined
    }
  
    return 'Inconnu'; // Retourne 'Inconnu' si aucun centre/hôpital n'est trouvé
  }
  //supprimer un don
  async deleteDon(id:string){
        // Demande de confirmation à l'utilisateur
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet hopital?');
    
    if (confirmDelete) {
      try {
        await this.donService.deleteDon(id); // Supprimer le centre
        this.loadDon // Recharger la liste après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du don:', error);
      }
    } else {
      console.log('Suppression annulée.');
    }
  }
  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
    // Appliquer le filtrage ici
  }
}


