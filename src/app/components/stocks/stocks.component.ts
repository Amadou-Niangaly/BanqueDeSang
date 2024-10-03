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
import { FilterPipe } from '../../filter.pipe';
import { FormsModule } from '@angular/forms';
import { Utilisateur } from '../../interfaces/utilisateur';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [SerchSectionComponent,RouterLink,CommonModule,FilterPipe,FormsModule],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit {
  stock:Stock[]=[];
  hopital:Hopital[]=[];
  centreDon:CentreDon[]=[];
  searchText:any;
  filterCriteria:any;
  user: Utilisateur | null = null;
  constructor(
    private stockService:StockService,
    private hopitalService:HopitalService,
    private centreDonService:CentreDonService,
    private authService: AuthService
  ){}
ngOnInit(): void {
    this.loadStock();
    this.loadHopital();
    this.loadCentreDon();
    this.loadUser();
}

  // Charger l'utilisateur connecté
  loadUser() {
    this.authService.getUserDataObservable().subscribe((userData) => {
      if (userData) {
        this.user = userData; // On assigne les données de l'utilisateur
        this.loadStock(); // Charger les stocks après avoir obtenu l'utilisateur
      } else {
        console.error('Aucun utilisateur trouvé.');
      }
    });
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
// Charger les stocks en fonction du rôle et des permissions de l'utilisateur
async loadStock() {
  if (this.user) {
    try {
      // Récupérer tous les centres et hôpitaux
      await this.stockService.getCentres(); // Utilisation potentielle pour d'autres opérations
      
      // Vérifiez le rôle de l'utilisateur pour décider quel stock charger
      if (this.user.role === 'admin') {
        // L'admin a accès à tous les stocks
        this.stock = await this.stockService.getStock();
      } else if (this.user.role === 'admin centre') {
        // L'admin centre peut charger uniquement les stocks liés à son centre
        if (this.user.centreId) { // Vérifier si centreId est défini
          this.stock = await this.stockService.getStockByCentre(this.user.centreId);
        } else {
          console.warn("centreId est undefined pour l'admin centre.");
        }
      } else if (this.user.role === 'admin hopital') {
        // L'admin hôpital peut charger uniquement les stocks liés à son hôpital
        if (this.user.hopitalId) { // Vérifier si hopitalId est défini
          this.stock = await this.stockService.getStockByHopital(this.user.hopitalId);
        } else {
          console.warn("hopitalId est undefined pour l'admin hopital.");
        }
      } else {
        console.warn("Rôle inconnu, aucun stock chargé.");
      }

      console.log("les stocks", this.stock);
    } catch (error) {
      console.error("Erreur lors du chargement des stocks", error);
    }
  } else {
    console.warn("L'utilisateur n'est pas connecté, stocks non chargés.");
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
      onSearchTextChange(searchText: string) {
        this.searchText = searchText;
        // Appliquer le filtrage ici
      }
        
      onFilterChange(filter: string) {
        this.filterCriteria = filter;
        console.log('Critère de filtrage:', this.filterCriteria); 
      }
      
}

