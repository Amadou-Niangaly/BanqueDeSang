import { Component, OnInit } from '@angular/core';
import { Don } from '../../../interfaces/don';
import { DonService } from '../../../services/don.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonFormComponent } from '../don-form/don-form.component';

@Component({
  selector: 'app-update-don',
  standalone: true,
  imports: [CommonModule,DonFormComponent],
  templateUrl: './update-don.component.html',
  styleUrl: './update-don.component.css'
})
export class UpdateDonComponent implements OnInit{
  don:Don | null=null;
  constructor(
    private donService:DonService,
    private route:ActivatedRoute,
    private router:Router
  ){}
 async ngOnInit(): Promise<void>{
        const donId=this.route.snapshot.paramMap.get('id');
    if(donId){
      this.don =await this.donService.getDonById(donId);
    }
}
async udpateDon(updateDon:Partial<Don>){
  if(this.don && this.don.id){
    await this.donService.updateDon(this.don.id,updateDon);
    this.router.navigate(['dasboard/dons']);
  }
  else{
    console.error('ID du don est manquante');
  }
}
}
