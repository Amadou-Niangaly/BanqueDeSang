import { Component, OnInit } from '@angular/core';
import { SerchSectionComponent } from "../serch-section/serch-section.component";
import { RouterLink } from '@angular/router';
import { Hopital } from '../../interfaces/hopital';
import { HopitalService } from '../../services/hopital.service';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-hopitaux',
  standalone: true,
  imports: [SerchSectionComponent,RouterLink,CommonModule,FilterPipe],
  templateUrl: './hopitaux.component.html',
  styleUrl: './hopitaux.component.css'
})
export class HopitauxComponent implements OnInit{
  hopitaux:Hopital[]=[];
  searchText:any;
  constructor(private hopitalService:HopitalService){}

ngOnInit(): void {
    this.loadHopitaux();
}
async  loadHopitaux() {
   try {
    this.hopitaux=await this.hopitalService.getHopital();
    console.log("liste des hopitaux",this.hopitaux)
   } catch (error) {
    console.error('erreur lors du chargements des hopitaux',error);
   }
  }
  async deleteHopital(id: string) {
    // Demande de confirmation à l'utilisateur
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cet hopital?');
    
    if (confirmDelete) {
      try {
        await this.hopitalService.deleteHopital(id); // Supprimer le centre
        this.loadHopitaux // Recharger la liste après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'hopital:', error);
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

