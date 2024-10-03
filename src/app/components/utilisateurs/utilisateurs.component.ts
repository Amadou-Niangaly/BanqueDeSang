import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SerchSectionComponent } from '../serch-section/serch-section.component';
import { RouterLink } from '@angular/router';
import { getFirestore } from 'firebase/firestore'; // Importer getFirestore
import { app } from '../../config/firebase-config';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { Utilisateur } from '../../interfaces/utilisateur';
import { FilterPipe } from "../../filter.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [SerchSectionComponent, RouterLink, CommonModule, FilterPipe,FormsModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {
   private Firestore=getFirestore(app );
   utilisateurs: Utilisateur[] = [];
   searchText:any;
   filterCriteria:any;
   constructor(private utiliteurService:UtilisateursService){}
   ngOnInit() {
    this.loadUtilisateurs();
  }
//methode pour charger les utilisateurs
 async loadUtilisateurs() {
   try {
    this.utilisateurs=await this.utiliteurService.getUtilisateurs();
   } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
   }
  }
//suprimmer un utilisateur 
  async deleteUtilisateur(id: string) {
    // Demande de confirmation à l'utilisateur
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer l\'utilisateur ?');
    
    if (confirmDelete) {
      try {
        await this.utiliteurService.deleteUtilisateur(id); // Supprimer le centre
        this.loadUtilisateurs(); // Recharger la liste après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      }
    } else {
      console.log('Suppression annulée.');
    }
  }

  onSearchTextChange(searchText: string) {
    this.searchText = searchText;
    // Appliquer le filtrage ici
  }
    
  onFilterChange(filter: string) {
    this.filterCriteria = filter;
    console.log('Critère de filtrage:', this.filterCriteria); 
  }
  
}
