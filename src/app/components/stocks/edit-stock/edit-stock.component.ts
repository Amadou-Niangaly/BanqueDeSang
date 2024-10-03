import { Component, OnInit } from '@angular/core';
import { Stock } from '../../../interfaces/stock';
import { StockService } from '../../../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockFormComponent } from '../stock-form/stock-form.component';

@Component({
  selector: 'app-edit-stock',
  standalone: true,
  imports: [CommonModule,StockFormComponent],
  templateUrl: './edit-stock.component.html',
  styleUrl: './edit-stock.component.css'
})
export class EditStockComponent  implements OnInit{
  stock: Stock | null = null;

  constructor(
    private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
 async ngOnInit(): Promise <void> {
    const stockId=this.route.snapshot.paramMap.get('id');
    if(stockId){
      this.stock = await this.stockService.getStockById(stockId);
    }
}
async updateStock(updateStock:Partial<Stock>){
  if(this.stock && this.stock.id){
    await this.stockService.updateStock(this.stock.id,updateStock);
    this.router.navigate(['dashboard/stocks'])
  }
  else{
    console.error('ID du stock est maquante');
  }
}

}




