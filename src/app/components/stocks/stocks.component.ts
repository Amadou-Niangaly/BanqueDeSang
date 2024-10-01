import { CentreDon } from './../../interfaces/centre-don';
import { Component, OnInit } from '@angular/core';
import { SerchSectionComponent } from "../serch-section/serch-section.component";
import { RouterLink } from '@angular/router';
import { Stock } from '../../interfaces/stock';
import { StockService } from '../../services/stock.service';
import { HopitalService } from '../../services/hopital.service';
import { CentreDonService } from '../../services/centre-don.service';
import { CommonModule } from '@angular/common';
import { Hopital } from '../../interfaces/hopital';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [SerchSectionComponent,RouterLink,CommonModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {
  stock:Stock[]=[];
  hopital:Hopital[]=[];
  centreDon:CentreDon[]=[];
  constructor(
    private stockService:StockService,
    private hopitalService:HopitalService,
    private centreDonService:CentreDonService
  ){}
ngOnInit(): void {
    this.loadStock();
    this.loadHopital();
    this.loadCentreDon();
}
//charger les centre de dons
 async loadCentreDon() {
   try {
    this.centreDon = await this.centreDonService.getCentre();
    console.log("les centres de dons",this.centreDon);
   } catch (error) {
    console.error("Erreur lors du chargement des hopitaux",error);
   }
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
  //charger les stocks
async loadStock() {
   try {
    this.stock= await this.stockService.getStock();
    console.log("les stocks",this.stock);
   } catch (error) {
    console.error("Erreur lors du chargement des stocks",error);
   }
}

getCentreOrHopitalName(centreId: string | undefined): string {
  if (!centreId) {
    return 'Inconnu'; // Retourne 'Inconnu' si centreId est undefined
  }

  const centre = this.centreDon.find(c => c.id === centreId);
  if (centre) {
    return centre.nom || 'Inconnu'; // Retourne le nom du centre ou 'Inconnu' si nom est undefined
  }

  const hopital = this.hopital.find(h => h.id === centreId);
  if (hopital) {
    return hopital.nom || 'Inconnu'; // Retourne le nom de l'hôpital ou 'Inconnu' si nom est undefined
  }

  return 'Inconnu'; // Retourne 'Inconnu' si aucun centre/hôpital n'est trouvé
}

  async deleteCentre(id: string) {
        // Demande de confirmation à l'utilisateur
        const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce stock?');
        
        if (confirmDelete) {
          try {
            await this.stockService.deleteStock(id); // Supprimer le centre
            this.loadStock(); // Recharger la liste après la suppression
          } catch (error) {
            console.error('Erreur lors de la suppression du stock:', error);
          }
        } else {
          console.log('Suppression annulée.');
        }
      }

}

