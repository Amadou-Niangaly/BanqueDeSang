import { Component, OnInit } from '@angular/core';
import { SerchSectionComponent } from "../serch-section/serch-section.component";
import { RouterLink } from '@angular/router';
import { Demande } from '../../interfaces/demande';
import { Utilisateur } from '../../interfaces/utilisateur';
import { DemandeService } from '../../services/demande.service';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [SerchSectionComponent,RouterLink,CommonModule,FilterPipe],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent implements OnInit{
  demande:Demande[]=[];
  demandesWithUser: (Demande & { user?: any })[] = [];
  utilisateur:Utilisateur[]=[];
  searchText:any;
  constructor(
    private demandeService:DemandeService,
    private utilisateurService:UtilisateursService
  ){}
  ngOnInit(): void {
      this.loadDemande();
      this.loadUtilisateur();
      this.loadDemandesWithUserData();
  }
   async loadUtilisateur() {
    try {
      this.utilisateur = await this.utilisateurService.getUtilisateurs();
      console.log("liste des user",this.utilisateur);
    } catch (error) {
      console.error('erreur lors du chargement des utilisateurs',error)
    }
  }
 async  loadDemande() {
    try {
      this.demande = await this.demandeService.getDemande();
      console.log("les demandes",this.demande);
    } catch (error) {
      console.error('erreur lors du chargement des demandes');
    }
  }
  async loadDemandesWithUserData() {
    try {
      this.demandesWithUser = await this.demandeService.getDemandesWithUserData();
    } catch (error) {
      console.error('Erreur lors du chargement des demandes avec utilisateur:', error);
    }
  }
  async deleteDemande(id:string){
        // Demande de confirmation à l'utilisateur
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet hopital?');
    
    if (confirmDelete) {
      try {
        await this.demandeService.deleteDemande(id); // Supprimer le centre
        this.loadDemande // Recharger la liste après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de la demande:', error);
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
