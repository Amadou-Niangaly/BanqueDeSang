import { Component, OnInit } from '@angular/core';
import { Demande } from '../../../interfaces/demande';
import { DemandeService } from '../../../services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemandeFormComponent } from '../demande-form/demande-form.component';

@Component({
  selector: 'app-update-demande',
  standalone: true,
  imports: [CommonModule,DemandeFormComponent],
  templateUrl: './update-demande.component.html',
  styleUrl: './update-demande.component.css'
})
export class UpdateDemandeComponent implements OnInit{
  demande:Demande | null=null;
  constructor(
    private demandeService:DemandeService,
    private route :ActivatedRoute,
    private router:Router
  ){}
  async ngOnInit(): Promise<void>{
    const demandeId=this.route.snapshot.paramMap.get('id');
    if(demandeId){
      this.demande =await this.demandeService.getDemandeById(demandeId);
    }
  }
async udpateDemande(updateDemande:Partial<Demande>){
  if(this.demande && this.demande.id){
    await this.demandeService.updateDemande(this.demande.id,updateDemande);
    this.router.navigate(['/demandes']);
  }
  else{
    console.error('ID de la demande est manquante');
  }
}
}
