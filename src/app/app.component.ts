import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseConfig } from './config/firebase-config';
import { NotificationsService } from './services/notifications.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Correction de 'styleUrl' en 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'BS-Frontend';
 constructor(private notificationService:NotificationsService){}
  ngOnInit(): void {
    this.notificationService.requestPermission();
  }


}
