import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DemandeService } from '../../../services/demande.service';
import { Router } from '@angular/router';
import { Don } from '../../../interfaces/don';
import { DonService } from '../../../services/don.service';
import { DonFormComponent } from '../don-form/don-form.component';

@Component({
  selector: 'app-add-don',
  standalone: true,
  imports: [CommonModule,DonFormComponent],
  templateUrl: './add-don.component.html',
  styleUrl: './add-don.component.css'
})
export class AddDonComponent {
  constructor(
    private donService:DonService,
    private router:Router
  ){ }
  // ajout
 addDon(don:Don){
 console.log('données du don:',don);
 //ajout
 this.donService.addDon(don)
 .then(()=>{
   console.log('don ajouté avec succès');
   //redirection
   this.router.navigate(['dashboard/dons'])
 })
 .catch((Error)=>{
   console.error('erreur lors de l\'ajout du don',Error)
 });
}
}
