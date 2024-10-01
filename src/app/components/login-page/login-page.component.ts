import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Vérifie si l'utilisateur est déjà connecté
    this.authService.getUser().subscribe(user => {
      if (user) {
        // Redirige vers la page d'accueil si l'utilisateur est déjà connecté
        this.router.navigate(['/dashboard/accueil']);
      }
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password);
        // La redirection se fait dans ngOnInit par abonnement à getUser()
      } catch (error: any) {
        this.errorMessage = error.message || 'Erreur inconnue lors de la connexion';
        console.error('Erreur de connexion:', this.errorMessage);
      }
    } else {
      this.errorMessage = 'Le formulaire est invalide. Veuillez vérifier les champs.';
      console.error('Le formulaire est invalide');
    }
  }
}
