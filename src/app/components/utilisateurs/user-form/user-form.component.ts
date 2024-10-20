import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentreDonService } from '../../../services/centre-don.service';
import { UtilisateursService } from '../../../services/utilisateurs.service'; // Importez le service
import { CentreDon } from '../../../interfaces/centre-don';
import { CommonModule } from '@angular/common';
import { Hopital } from '../../../interfaces/hopital';
import { HopitalService } from '../../../services/hopital.service';
import { Utilisateur } from '../../../interfaces/utilisateur';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() utilisateur: Utilisateur = { 
    id: "", 
    email: "",      // Ajoutez l'initialisation de l'email
    password: "",   // Ajoutez l'initialisation du mot de passe
    nom: "",
    prenom: "",
    dateNaissance: "",
    numeroTelephone: "",
    localisation: "",
    role: "admin centre",
    groupeSanguin: "A+",
    centreId: "",
    hopitalId: ""
  }; // Données de l'utilisateur à éditer
  @Output() formSubmit = new EventEmitter<any>(); // Événement pour soumettre le formulaire

  hopitaux: Hopital[] = [];
  centreDon: CentreDon[] = [];
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private centreDonService: CentreDonService,
    private utilisateursService: UtilisateursService ,
    private hopitalService:HopitalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCentreDon();
    this.loadHopitaux();
  }
  loadHopitaux() {
   this.hopitalService.getHopital().then(hopitaux=>{
    this.hopitaux=hopitaux;
    console.log('hopital chargé',this.hopitaux);
   }).catch(error=>{
    console.error('Erreur lors du chargement des hopitaux',error)
   })
  }

  loadCentreDon() {
    this.centreDonService.getCentre().then(centreDon => {
      this.centreDon = centreDon;
      console.log('Centres de dons chargés :', this.centreDon); // Debug
    }).catch(error => {
      console.error('Erreur lors du chargement des centres :', error);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['utilisateur'] && this.utilisateur) {
      this.initForm(); // Réinitialiser le formulaire si les données changent
      this.userForm.patchValue(this.utilisateur); // Remplir le formulaire avec les nouvelles données
    }
  }
  

  initForm() {
    if (this.utilisateur) { // Vérifiez si utilisateur est défini
      this.userForm = this.fb.group({
        nom: [this.utilisateur.nom || '', Validators.required],
        prenom: [this.utilisateur.prenom || '', Validators.required],
        dateNaissance: [this.utilisateur.dateNaissance || '', Validators.required],
        numeroTelephone: [this.utilisateur.numeroTelephone || '', Validators.required],
        email: [this.utilisateur.email || '', [Validators.required, Validators.email]],
        localisation: [this.utilisateur.localisation || '', Validators.required],
        role: [this.utilisateur.role || '', Validators.required],
        groupeSanguin: [this.utilisateur.groupeSanguin || 'A+', Validators.required],
        centreId: [this.utilisateur.centreId || ''],
        hopitalId: [this.utilisateur.hopitalId || ''],
        password:[this.utilisateur.password || '',Validators.required]
      });
    } else {
      // Si utilisateur n'est pas défini, initialisez le formulaire avec des valeurs par défaut
      this.userForm = this.fb.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        dateNaissance: ['', Validators.required],
        numeroTelephone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        localisation: ['', Validators.required],
        role: ['', Validators.required],
        groupeSanguin: ['A+', Validators.required],
        centreId: [''],
        hopitalId: [''],
        password:[''],

      });
    }
  }
//
onSubmit() {
  if (this.userForm.valid) {
    console.log('Formulaire valide:', this.userForm.value);
    this.formSubmit.emit(this.userForm.value);
  } else {
    console.error('Le formulaire contient des erreurs :');
    Object.keys(this.userForm.controls).forEach(key => {
      const controlErrors = this.userForm.get(key)?.errors;
      if (controlErrors) {
        console.error(`Erreur dans le champ ${key}:`, controlErrors);
      }
    });
  }
}


   //
  onRoleChange() {
    const roleControl = this.userForm.get('role');
    const centreIdControl = this.userForm.get('centreId');
    const hopitalIdControl = this.userForm.get('hopitalId');
  
    // Réinitialisez les valeurs si le rôle n'est pas celui qui nécessite le champ
    if (roleControl && roleControl.value !== 'admin centre') {
      centreIdControl?.setValue(''); // Réinitialisez centreId si le rôle n'est pas 'admin centre'
    }
    
    if (roleControl && roleControl.value !== 'admin hopital') {
      hopitalIdControl?.setValue(''); // Réinitialisez hopitalId si le rôle n'est pas 'admin hopital'
    }
  }
  
  
}
