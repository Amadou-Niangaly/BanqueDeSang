import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentreDon } from '../../../interfaces/centre-don';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-centre-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './centre-form.component.html',
  styleUrl: './centre-form.component.css'
})
export class CentreFormComponent implements OnInit, OnChanges{
   @Input() centreDon:CentreDon={
     id: ''
   };
   @Output() submitForm=new EventEmitter<any>;
   centreForm!:FormGroup;
formControls: any;
   constructor(private fb:FormBuilder){

   }

   ngOnInit(): void {
       this.initForm();
   }
 
   ngOnChanges(changes: SimpleChanges): void {
       if(changes['centreDon']){
        this.initForm();
       }
   }
   initForm() {
    if (this.centreDon) {
      this.centreForm = this.fb.group({
        nom: [this.centreDon.nom || '', Validators.required],
        adresse: [this.centreDon.adresse || '', Validators.required],
        localisation: [this.centreDon.localisation || '', Validators.required],
        telephone: [this.centreDon.telephone || '', Validators.required],
        heureOuverture: [this.centreDon.heureOuverture || '', Validators.required],  // Corrected this line
        stockActuel: [this.centreDon.stockActuel || 0, Validators.required]  // Corrected this line
      });
    } else {
      // Initialisations du formulaire par défaut
      this.centreForm = this.fb.group({
        nom: ['', Validators.required],
        adresse: ['', Validators.required],
        localisation: ['', Validators.required],
        telephone: ['', Validators.required],
        heureOuverture: ['', Validators.required],
        stockActuel: [0, Validators.required]
      });
    }
  }
  
  onSubmit(){
   if(this.centreForm.valid){
    this.submitForm.emit(this.centreForm.value);
   }
   else{
    console.error('le formulaire n\'nest pas valide');
   }
  }
}

