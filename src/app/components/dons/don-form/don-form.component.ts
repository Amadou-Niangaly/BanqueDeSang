import { CentreDon } from './../../../interfaces/centre-don';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Don } from '../../../interfaces/don';
import { CentreDonService } from '../../../services/centre-don.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-don-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './don-form.component.html',
  styleUrl: './don-form.component.css'
})
export class DonFormComponent implements OnInit,OnChanges{
  @Input() don:Don={id:""};
  @Output() submitForm= new EventEmitter<any>;
  donForm!:FormGroup;
   centre:CentreDon[]=[];
  constructor(
    private fb:FormBuilder,
    private centreDonService:CentreDonService,
    private authService:AuthService
  ){
    this.donForm =this.fb.group({
      centre:['',Validators.required],
      quantite:['',Validators.required],
      groupeSanguin:['',Validators.required]
    });
    
  }
  ngOnInit(): void {
      this.loadCentre();
  }
  loadCentre() {
    this.centreDonService.getCentre().then(centreDon => {
      this.centre=centreDon;
      console.log('Centres de dons chargés :', this.centre); // Debug
    }).catch(error => {
      console.error('Erreur lors du chargement des centres :', error);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
        if (changes['don'] && changes['don'].currentValue) {
    console.log('don reçu dans ngOnChanges:', changes['don'].currentValue);

    if (this.don) {
      // Utilisation de setTimeout pour s'assurer que le patch se fait après le rendu du formulaire
      setTimeout(() => {
        this.donForm.patchValue({
          groupeSanguin: this.don.groupeSanguin || '',
          quantite: this.don.quantite || '',
          urgence: this.don.centre || ''
        });
      }, 0);
    }
  }
  }
 onSubmit() {
  if (this.donForm.valid) {
    const userId = this.getCurrentUserId();
    if (!userId) {
      console.error('Aucun utilisateur connecté. Impossible de soumettre la demande.');
      return; // Ne pas soumettre si l'utilisateur n'est pas connecté
    }

    const donData: Don = {
      ...this.donForm.value,
      userId: userId, // ID de l'utilisateur connecté
      status: 'en attente', // Statut par défaut
      dateDon: new Date().toISOString().split('T')[0], // Date actuelle au format YYYY-MM-DD
    };

    this.submitForm.emit(donData); // Émet les données de la demande
  } else {
    console.error('Le formulaire n\'est pas valide');
  }
}

  getCurrentUserId(): string {
    // Remplace par ta logique pour récupérer l'ID de l'utilisateur connecté
    return this.authService.getCurrentUserId() || '';
  }

}

