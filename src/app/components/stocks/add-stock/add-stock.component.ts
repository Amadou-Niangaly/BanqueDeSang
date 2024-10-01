import { Component } from '@angular/core';
import { StockFormComponent } from "../stock-form/stock-form.component";
import { StockService } from '../../../services/stock.service';
import { Router } from '@angular/router';
import { Stock } from '../../../interfaces/stock';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [StockFormComponent],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css'
})
export class AddStockComponent {
    constructor(
      private stockService:StockService,
      private router:Router
    ){}

     addStock(stock: Stock) {
      console.log('Données du stock à ajouter', stock);
     //ajout
     this.stockService.addStock(stock)
     .then(()=>{
      console.log('stock ajouté avec succès!');
      this.router.navigate(['/stocks'])
     })
     .catch((error)=>{
      console.error('Erreur lors de l\'ajout du stock:', error);
     })
}
}