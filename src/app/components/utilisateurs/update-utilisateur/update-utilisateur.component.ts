import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../../interfaces/utilisateur';
import { UtilisateursService } from '../../../services/utilisateurs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserFormComponent } from "../user-form/user-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-utilisateur',
  standalone: true,
  imports: [UserFormComponent,CommonModule],
  templateUrl: './update-utilisateur.component.html',
  styleUrl: './update-utilisateur.component.css'
})
export class UpdateUtilisateurComponent implements OnInit {
  utilisateur:Utilisateur |null=null;
  constructor(
    private utilisateursService:UtilisateursService,
    private route:ActivatedRoute,
    private router:Router
  ){

  }
  async ngOnInit(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'URL
    if (userId) {
      this.utilisateur = await this.utilisateursService.getUtilisateurById(userId);
    }
  }
  async updateUtilisateur(updatedUser: Partial<Utilisateur>) {
    if (this.utilisateur && this.utilisateur.id) {
      await this.utilisateursService.updateUtilisateur(this.utilisateur.id, updatedUser);
      this.router.navigate(['dashboard/utilisateurs']);
    } else {
      console.error('L\'ID de l\'utilisateur est manquant ou l\'utilisateur n\'existe pas.');
    }
  }
  
}
