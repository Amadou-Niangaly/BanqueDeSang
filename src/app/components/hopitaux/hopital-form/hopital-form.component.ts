import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hopital } from '../../../interfaces/hopital';

@Component({
  selector: 'app-hopital-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './hopital-form.component.html',
  styleUrl: './hopital-form.component.css'
})
export class HopitalFormComponent  implements OnInit,OnChanges{
   @Input() hopital:Hopital={id:''};
   @Output() submitForm=new EventEmitter<any>;
   hopitalForm!:FormGroup;
   constructor(private fb:FormBuilder){}
   ngOnInit(): void {
    this.initForm(); 
   }
   ngOnChanges(changes: SimpleChanges): void {
       if(changes['hopital']){
        this.initForm();
       }
   }

  initForm() {
   if(this.hopital){
    this.hopitalForm=this.fb.group({
      nom:[this.hopital.nom || '',Validators.required],
      adresse:[this.hopital.adresse || '',Validators.required],
      localisation:[this.hopital.localisation || '',Validators.required],
      telephone:[this.hopital.telephone || '',Validators.required],
      heureOuverture:[this.hopital.heureOuverture || '',Validators.required],
      stockActuel: [this.hopital.stockActuel || 0,Validators.required]
    });
   }else{
      //initialisation du formulaire par defaut
      this.hopitalForm=this.fb.group({
        nom:['',Validators.required],
        adresse:['',Validators.required],
        localisation:['',Validators.required],
        telephone:['',Validators.required],
        heureOuverture:['',Validators.required],
        stockActuel:[0,Validators.required]
      })
   }
  }
 onSubmit(){
  if(this.hopitalForm.valid){
    this.submitForm.emit(this.hopitalForm.value)
  }else{
    console.error('le formulaire n\'est pas valid');
  }
 }
}


  

