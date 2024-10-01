import { Component, OnInit } from '@angular/core';
import { Hopital } from '../../../interfaces/hopital';
import { HopitalService } from '../../../services/hopital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HopitalFormComponent } from "../hopital-form/hopital-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-hopital',
  standalone: true,
  imports: [HopitalFormComponent,CommonModule],
  templateUrl: './update-hopital.component.html',
  styleUrl: './update-hopital.component.css'
})
export class UpdateHopitalComponent  implements OnInit{
  hopital:Hopital |null=null;
  constructor(
    private hopitalService:HopitalService,
    private route:ActivatedRoute,
    private router:Router
  ){}
 async ngOnInit(): Promise<void> {
    const hopitalId= this.route.snapshot.paramMap.get('id');
    if(hopitalId){
      this.hopital =await this.hopitalService.getHopitalById(hopitalId);
    }
}
async updateHopital(updateHopital:Partial<Hopital>){
  if(this.hopital && this.hopital.id){
    await this.hopitalService.updateHopital(this.hopital.id,updateHopital);
    this.router.navigate(['/hopitaux']);
  }
  else{
    console.error('l\'ID de l\'hopital est manquante');
  }
}

}
