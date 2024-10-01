import { Component, OnInit } from '@angular/core';
import { SerchSectionComponent } from "../serch-section/serch-section.component";
import { RouterLink } from '@angular/router';
import { CentreDon } from '../../interfaces/centre-don';
import { CentreDonService } from '../../services/centre-don.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-centre-don',
  standalone: true,
  imports: [SerchSectionComponent,RouterLink,CommonModule],
  templateUrl: './centre-don.component.html',
  styleUrl: './centre-don.component.css'
})
export class CentreDonComponent implements OnInit{
  centres:CentreDon[]=[];
  constructor(
    private centreDonService:CentreDonService
  ){}
  ngOnInit(): void {
      this.loadCentres();
  }
  async loadCentres() {
    try {
      this.centres = await this.centreDonService.getCentre(); // Récupérer la liste des centres
    } catch (error) {
      console.error('Erreur lors du chargement des centres:', error);
    }
  }

  async deleteCentre(id: string) {
    // Demande de confirmation à l'utilisateur
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce centre ?');
    
    if (confirmDelete) {
      try {
        await this.centreDonService.deleteCentre(id); // Supprimer le centre
        this.loadCentres(); // Recharger la liste après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression du centre:', error);
      }
    } else {
      console.log('Suppression annulée.');
    }
  }
}
