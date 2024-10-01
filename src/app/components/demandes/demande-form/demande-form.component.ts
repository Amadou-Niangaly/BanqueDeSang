import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Demande } from '../../../interfaces/demande';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-demande-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './demande-form.component.html',
  styleUrl: './demande-form.component.css'
})
export class DemandeFormComponent implements OnInit,OnChanges{
  @Input() demande:Demande={id:""};
  @Output() submitForm= new EventEmitter<any>;
  demandeForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService
  
  ){
    //initialisation du formulaire
     this.demandeForm=this.fb.group({
      groupeSanguin:['',Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]],
      urgence: [false]
     })
  }
ngOnInit(): void {
    
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes['demande'] && changes['demande'].currentValue) {
    console.log('demande reçu dans ngOnChanges:', changes['demande'].currentValue);

    if (this.demande) {
      // Utilisation de setTimeout pour s'assurer que le patch se fait après le rendu du formulaire
      setTimeout(() => {
        this.demandeForm.patchValue({
          groupeSanguin: this.demande.groupeSanguin || '',
          quantite: this.demande.quantite || '',
          urgence: this.demande.urgence || false
        });
      }, 0);
    }
  }
}
onSubmit() {
  if (this.demandeForm.valid) {
    const userId = this.getCurrentUserId();
    if (!userId) {
      console.error('Aucun utilisateur connecté. Impossible de soumettre la demande.');
      return; // Ne pas soumettre si l'utilisateur n'est pas connecté
    }

    const demandeData: Demande = {
      ...this.demandeForm.value,
      userId: userId, // ID de l'utilisateur connecté
      status: 'en attente', // Statut par défaut
      dateDemande: new Date().toISOString().split('T')[0], // Date actuelle au format YYYY-MM-DD
    };

    this.submitForm.emit(demandeData); // Émet les données de la demande
  } else {
    console.error('Le formulaire n\'est pas valide');
  }
}

getCurrentUserId(): string {
  return this.authService.getCurrentUserId() || ''; // Retourne une chaîne vide si l'utilisateur n'est pas connecté
}
}


