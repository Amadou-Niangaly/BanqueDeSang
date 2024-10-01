import { Component } from '@angular/core';
import { CentreFormComponent } from "../centre-form/centre-form.component";
import { CentreDonService } from '../../../services/centre-don.service';
import { Router } from '@angular/router';
import { CentreDon } from '../../../interfaces/centre-don';

@Component({
  selector: 'app-add-centre',
  standalone: true,
  imports: [CentreFormComponent],
  templateUrl: './add-centre.component.html',
  styleUrl: './add-centre.component.css'
})
export class AddCentreComponent  {
  constructor(
    private centreDonService:CentreDonService,
    private router:Router
  ){}
  addCentre(centre:CentreDon){
    console.log('Données du centre à ajouter:', centre);
    //ajout du centre
    this.centreDonService.addCentre(centre)
    .then(() => {
      console.log('Centre ajouté avec succès !');
      // Redirection ou message de confirmation
      this.router.navigate(['/centre-dons']); 
    })
    .catch((error) => {
      console.error('Erreur lors de l\'ajout du centre:', error);
    });

  }
}
