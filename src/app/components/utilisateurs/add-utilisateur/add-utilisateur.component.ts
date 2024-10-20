import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UtilisateursService } from '../../../services/utilisateurs.service';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from "../user-form/user-form.component";
import { Router } from '@angular/router';
import { NotificationsService } from '../../../services/notifications.service';

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
   private router:Router,
   private notificationsService:NotificationsService
  ) {}
  ngOnInit(): void {
    //initialisation
      this.userForm=this.fb.group({
         nom:['',Validators.required],
         prenom:['',Validators.required],
         dateNaissance:['',Validators.required],
         numeroTelephone: ['', Validators.required],
         email:['',[Validators.required,Validators.email]],
         localisation: ['', Validators.required],
         role: ['donneur', Validators.required], 
         groupeSanguin: ['O+', Validators.required] 
      });
  }


  // Méthode pour soumettre le formulaire
  onSubmit(userData: any) {
    // Récupérer le token FCM et l'ajouter à userData
    this.notificationsService.requestPermission().then((token) => {
      userData.fcm_token = token; // Ajoutez le token FCM à userData
      this.utilisateurService.addUtilisateur(userData)
        .then(() => {
          console.log('Utilisateur ajouté avec succès!');
          this.router.navigate(['dashboard/utilisateurs']);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        });
    }).catch((error) => {
      console.error('Erreur lors de la récupération du token FCM :', error);
    });
  }
  
    }
    