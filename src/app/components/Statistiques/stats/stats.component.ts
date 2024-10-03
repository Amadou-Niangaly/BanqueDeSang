import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'] 
})
export class StatsComponent implements OnInit {
  public config: any = {
    type: 'bar', // Type de graphique
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Étiquettes des mois
      datasets: [
        {
          label: 'Dons',
          data: [65, 59, 80, 81, 56, 55], // Données pour les dons
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond pour les barres
          borderColor: 'rgba(75, 192, 192, 1)', // Couleur de bord pour les barres
          borderWidth: 1, // Épaisseur de la bordure
        },
        {
          label: 'Demandes',
          data: [28, 48, 40, 19, 86, 27], // Données pour les demandes
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Couleur de fond pour les barres
          borderColor: 'rgba(255, 99, 132, 1)', // Couleur de bord pour les barres
          borderWidth: 1, // Épaisseur de la bordure
        },
      ],
    },
    options: {
      aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true, // Commencer l'axe y à zéro
        },
      },
    },
  };

  chart: any;

  ngOnInit(): void {
    this.chart = new Chart('MyChart', this.config); // Création du graphique
  }
}
