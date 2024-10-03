import { Component } from '@angular/core';
import { HopitalFormComponent } from "../hopital-form/hopital-form.component";
import { HopitalService } from '../../../services/hopital.service';
import { Router } from '@angular/router';
import { Hopital } from '../../../interfaces/hopital';

@Component({
  selector: 'app-add-hopital',
  standalone: true,
  imports: [HopitalFormComponent],
  templateUrl: './add-hopital.component.html',
  styleUrl: './add-hopital.component.css'
})
export class AddHopitalComponent {
  constructor(
    private hopitalService:HopitalService,
    private router:Router
  ){ }
  addHopital(hopital:Hopital){
    console.log('Données du centre à ajouter:',hopital);
    //ajout du centre
    this.hopitalService.addHopital(hopital)
      .then(()=>{
        console.log('hopital ajouté avec succès');
        //redirection
        this.router.navigate(['dashboard/hopitaux'])

      })
      .catch((Error)=>{
        console.error('erreur lors de l\'ajout de l\'hopital',Error)
      });
  }

}

