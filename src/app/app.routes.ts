import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs.component';
import { DonsComponent } from './components/dons/dons.component';
import { CentreDonComponent } from './components/centre-don/centre-don.component';
import { HopitauxComponent } from './components/hopitaux/hopitaux.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { DemandesComponent } from './components/demandes/demandes.component';
import { AddUtilisateurComponent } from './components/utilisateurs/add-utilisateur/add-utilisateur.component';
import { UpdateUtilisateurComponent } from './components/utilisateurs/update-utilisateur/update-utilisateur.component';
import { UpdateDonComponent } from './components/dons/update-don/update-don.component';
import { AddCentreComponent } from './components/centre-don/add-centre/add-centre.component';
import { AddHopitalComponent } from './components/hopitaux/add-hopital/add-hopital.component';
import { UpdateHopitalComponent } from './components/hopitaux/update-hopital/update-hopital.component';
import { AddDemandeComponent } from './components/demandes/add-demande/add-demande.component';
import { UpdateDemandeComponent } from './components/demandes/update-demande/update-demande.component';
import { AddStockComponent } from './components/stocks/add-stock/add-stock.component';
import { EditStockComponent } from './components/stocks/edit-stock/edit-stock.component';
import { GuardService } from './services/guard.service';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AppComponent } from './app.component';
import { AddDonComponent } from './components/dons/add-don/add-don.component';
import { UpdateCentreComponent } from './components/centre-don/update-centre/update-centre.component';
import { DashboardLayoutComponentComponent } from './components/dashboard-layout-component/dashboard-layout-component.component';
import { FormMaladieComponent } from './components/maladies/form-maladie/form-maladie.component';


export const routes: Routes = [
    { 
      path: '',
      redirectTo: 'login-page',
      pathMatch: 'full' 
    },
    {
      path: '',
      component: AuthLayoutComponent, // Pour les routes d'authentification
      children: [
        { path: 'login-page', component: LoginPageComponent },
      ]
    },
    {
      path: 'dashboard', // Assurez-vous d'utiliser un préfixe clair pour les routes du tableau de bord
      component: DashboardLayoutComponentComponent, // Utilisez un layout spécifique pour le tableau de bord
      canActivate: [GuardService], // Protège ces routes
      children: [
        { path: 'accueil', component: AccueilComponent },
        { path: 'utilisateurs', component: UtilisateursComponent },
        { path: 'dons', component: DonsComponent },
        { path: 'demandes', component: DemandesComponent },
        { path: 'centre-dons', component: CentreDonComponent },
        { path: 'hopitaux', component: HopitauxComponent },
        { path: 'maladie', component: FormMaladieComponent },
        { path: 'stocks', component: StocksComponent },
        { path: 'add-user', component: AddUtilisateurComponent },
        { path: 'edit-user/:id', component: UpdateUtilisateurComponent },
        { path: 'add-don', component: AddDonComponent },
        { path: 'edit-don/:id', component: UpdateDonComponent },
        { path: 'add-centre', component: AddCentreComponent },
        { path: 'edit-centre/:id', component: UpdateCentreComponent },
        { path: 'add-hopital', component: AddHopitalComponent },
        { path: 'edit-hopital/:id', component: UpdateHopitalComponent },
        { path: 'add-demande', component: AddDemandeComponent },
        { path: 'edit-demande/:id', component: UpdateDemandeComponent },
        { path: 'add-stock', component: AddStockComponent },
        { path: 'edit-stock/:id', component: EditStockComponent }
      ]
    },
];
