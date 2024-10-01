import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateursService } from '../../../services/utilisateurs.service';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from "../user-form/user-form.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-utilisateur',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UserFormComponent],
  templateUrl: './add-utilisateur.component.html',
  styleUrl: './add-utilisateur.component.css'
})
export class AddUtilisateurComponent implements OnInit {
  userForm!:FormGroup;
  constructor(
   private fb:FormBuilder,
   private utilisateurService:UtilisateursService,
   private router:Router
  ) {}
  ngOnInit(): void {
    //initialisation
      this.userForm=this.fb.group({
         nom:['',Validators.required],
         prenom:['',Validators.required],
         dateNaissance:['',Validators.required],
         telephone: ['', Validators.required],
         email:['',[Validators.required,Validators.email]],
         localisation: ['', Validators.required],
         role: ['donneur', Validators.required], 
         groupeSanguin: ['O+', Validators.required] 
      });
  }
  //soumission du formulaire
    // Méthode pour soumettre le formulaire
    onSubmit(userData: any) {
      this.utilisateurService.addUtilisateur(userData)
        .then(() => {
          console.log('Utilisateur ajouté avec succès!');
          this.router.navigate(['dashboard/utilisateurs'])
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        });
    }
  }
