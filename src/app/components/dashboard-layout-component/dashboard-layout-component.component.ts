import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Utilisateur } from '../../interfaces/utilisateur';
import { CommonModule } from '@angular/common';
import { StatsComponent } from '../Statistiques/stats/stats.component';

@Component({
  selector: 'app-dashboard-layout-component',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard-layout-component.component.html',
  styleUrl: './dashboard-layout-component.component.css'
})
export class DashboardLayoutComponentComponent  implements OnInit{
  user: Utilisateur | null = null;
  imgProfil="assets/default.png"
  constructor(
    private authService: AuthService, private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.getUserDataObservable().subscribe(userData => {
      console.log('Données utilisateur dans le composant:', userData); // Ajoutez ce log
      this.user = userData; // Met à jour l'utilisateur à partir des données récupérées
    });
      
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


}
