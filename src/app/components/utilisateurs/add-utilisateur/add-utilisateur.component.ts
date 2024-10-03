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
         telephone: ['', Validators.required],
         email:['',[Validators.required,Validators.email]],
         localisation: ['', Validators.required],
         role: ['donneur', Validators.required], 
         groupeSanguin: ['O+', Validators.required] 
      });
  }

    // Méthode pour soumettre le formulaire
    async onSubmit(userData: any) {
      try {
        // Demande de permission pour les notifications
        await this.notificationsService.requestPermission();
    
        // Une fois la permission accordée, obtenir le token FCM
        const token = await this.notificationsService.getToken();
    
        if (token) {
          userData.fcmToken = token; // Ajouter le token FCM aux données de l'utilisateur
    
          await this.utilisateurService.addUtilisateur(userData);
          console.log('Utilisateur ajouté avec succès!');
          this.router.navigate(['dashboard/utilisateurs']);
        } else {
          console.log('Token FCM non récupéré.');
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
      }
    }
    
}
