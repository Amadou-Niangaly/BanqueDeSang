import { Component, OnInit } from '@angular/core';
import { CentreDon } from '../../../interfaces/centre-don';
import { CentreDonService } from '../../../services/centre-don.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CentreFormComponent } from "../centre-form/centre-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-centre',
  standalone: true,
  imports: [CentreFormComponent,CommonModule],
  templateUrl: './update-centre.component.html',
  styleUrl: './update-centre.component.css'
})
export class UpdateCentreComponent implements OnInit{
  centreDon:CentreDon |null=null;
 constructor(
  private centreDonService:CentreDonService,
  private route:ActivatedRoute,
  private router:Router
){}

   async ngOnInit(): Promise<void> {
      const centreId=this.route.snapshot.paramMap.get('id');
      if(centreId){
        this.centreDon= await this.centreDonService.getCentreById(centreId)
      }
  }
  async updateCentre(updateCentre:Partial<CentreDon>){
    if(this.centreDon && this.centreDon.id){
      await this.centreDonService.updateCentre(this.centreDon.id,updateCentre);
      this.router.navigate(['/centre-dons']);
    }
    else{
      console.error('l\'ID du centre n\'existe pas');
    }
  }

}


