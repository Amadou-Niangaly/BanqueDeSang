import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatsComponent } from '../Statistiques/stats/stats.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule,StatsComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {

}
