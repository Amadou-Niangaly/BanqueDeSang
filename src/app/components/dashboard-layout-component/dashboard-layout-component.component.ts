import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Utilisateur } from '../../interfaces/utilisateur';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationsService } from '../../services/notifications.service';


@Component({
  selector: 'app-dashboard-layout-component',
  standalone: true,
  imports: [RouterModule,CommonModule,NotificationsComponent],
  templateUrl: './dashboard-layout-component.component.html',
  styleUrl: './dashboard-layout-component.component.css'
})
export class DashboardLayoutComponentComponent  implements OnInit{
  user: Utilisateur | null = null;
    // Variables pour gérer la visibilité des sections
    canManageCentre: boolean = false;
    canManageHopital: boolean = false;
    canSeeAllData: boolean = false;
    isModalOpen = false;

    imgProfil="assets/default.png"
  constructor(
    private authService: AuthService, private router: Router,
    private notificationsService:NotificationsService
  ) {}

  ngOnInit(): void {
    this.authService.getUserDataObservable().subscribe(userData => {
      console.log('Données utilisateur dans le composant:', userData); // Ajoutez ce log
      this.user = userData; // Met à jour l'utilisateur à partir des données récupérées
    });
    //demande de permission pour les notifications
      
  }

  async logout() {
    const confirmLogout = confirm('Êtes-vous sûr de vouloir vous déconnecter ?'); // Boîte de confirmation
    if (confirmLogout) {
      try {
        await this.authService.logout(); // Appeler la méthode de déconnexion
        this.router.navigate(['/login-page']); // Rediriger vers la page de connexion
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }
  }

   // Applique les restrictions selon le rôle de l'utilisateur
   applyRoleRestrictions() {
    if (!this.user) {
      return;
    }

    switch (this.user.role) {
      case 'admin':
        this.canManageCentre = true;
        this.canManageHopital = true;
        this.canSeeAllData = true;
        break;
      case 'admin centre':
        this.canManageCentre = true;
        this.canManageHopital = false;
        this.canSeeAllData = false;
        break;
      case 'admin hopital':
        this.canManageCentre = false;
        this.canManageHopital = true;
        this.canSeeAllData = false;
        break;
      default:
        // Par défaut, on masque tout
        this.canManageCentre = false;
        this.canManageHopital = false;
        this.canSeeAllData = false;
    }
  }
 
  notifications = [
    { message: 'Nouvelle demande de don.', date: new Date() },
    { message: 'Votre demande a été approuvée.', date: new Date() },
  ];

  openNotificationModal() {
    this.isModalOpen = true;
  }
 
}
