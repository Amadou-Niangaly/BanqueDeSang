import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Stock } from '../../../interfaces/stock';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentreDon } from '../../../interfaces/centre-don';
import { Hopital } from '../../../interfaces/hopital';
import { CentreDonService } from '../../../services/centre-don.service';
import { HopitalService } from '../../../services/hopital.service';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css'
})
export class StockFormComponent implements OnInit,OnChanges {
  
  @Input() stock:Stock={id:""};
  @Output() submitForm=new EventEmitter<any>;
  stockForm!:FormGroup;
  centre:CentreDon[]=[];
  hopitaux:Hopital[]=[];

  constructor(
    private fb:FormBuilder,
    private centreDonService:CentreDonService,
    private hopitalService:HopitalService,
    private stockService:StockService,
    private cdRef:ChangeDetectorRef
  ){
    // Initialisation du formulaire par défaut
  this.stockForm = this.fb.group({
    centreId: ['', Validators.required],
    groupeSanguin: ['', Validators.required],
    quantite: ['', [Validators.required, Validators.min(1)]]
  });
  }
  ngOnInit(): void {
      this.initForm();
      this.loadCentre();
      this.loadHopitaux();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stock'] && changes['stock'].currentValue) {
      console.log('Stock reçu dans ngOnChanges:', changes['stock'].currentValue);
  
      if (this.stockForm) {
        // Utilisation de setTimeout pour s'assurer que le patch se fait après le rendu du formulaire
        setTimeout(() => {
          this.stockForm.patchValue({
            centreId: this.stock.centreId || '',
            groupeSanguin: this.stock.groupeSanguin || '',
            quantite: this.stock.quantite || ''
          });
        }, 0);
      }
    }
  }
  initForm() {
    this.stockForm = this.fb.group({
      centreId: ['', Validators.required],
      groupeSanguin: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]]
    });
  }
  loadHopitaux() {
    this.hopitalService.getHopital().then(hopitaux=>{
     this.hopitaux=hopitaux;
     console.log('hopital chargé',this.hopitaux);
    }).catch(error=>{
     console.error('Erreur lors du chargement des hopitaux',error)
    })
   }
 
   loadCentre() {
     this.centreDonService.getCentre().then(centreDon => {
       this.centre = centreDon;
       console.log('Centres de dons chargés :', this.centre); // Debug
     }).catch(error => {
       console.error('Erreur lors du chargement des centres :', error);
     });
   }
   onSubmit(){
    if(this.stockForm.valid){
      this.submitForm.emit(this.stockForm.value)
    }else{
      console.error('le formulaire n\'est pas valid');
    }
   }
}
