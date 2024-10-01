import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.authService.getUser();

    if (user) {
      return true; // L'utilisateur est connecté, autoriser l'accès
    } else {
      console.log('Utilisateur non authentifié, redirection vers la page de connexion');
      this.router.navigate(['/login-page'], {
        queryParams: { returnUrl: state.url }
      });
      return false; // Ne pas autoriser l'accès
    }
  }
}
