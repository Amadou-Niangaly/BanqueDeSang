import { DemandeFormComponent } from './../demande-form/demande-form.component';
import { Component } from '@angular/core';
import { DemandeService } from '../../../services/demande.service';
import { Router } from '@angular/router';
import { Demande } from '../../../interfaces/demande';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-add-demande',
  standalone: true,
  imports: [ReactiveFormsModule,DemandeFormComponent],
  templateUrl: './add-demande.component.html',
  styleUrl: './add-demande.component.css'
})
export class AddDemandeComponent {
     constructor(
      private demandeService:DemandeService,
      private router:Router,
      private notificationsService:NotificationsService
     ){}
  addDemande(demande:Demande){
    console.log('données de la demande:',demande);
    //ajout
    this.demandeService.addDemande(demande)
    .then(()=>{
      console.log('demande ajouté avec succès');
      //redirection
      this.router.navigate(['dashboard/demandes'])
    })
    .catch((Error)=>{
      console.error('erreur lors de l\'ajout de la demande',Error)
    });
  }
}
