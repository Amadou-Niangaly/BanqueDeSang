import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notification:any[]=[];
   
 @Input() notifications:{message:string;date:Date}[]=[];
 @Output() closeModal = new EventEmitter<void>();
isVisible: any;
constructor(private notificationsServices:NotificationsService){
  
}
 ngOnInit(): void {
     this.loadNotifications();
 }
  async loadNotifications() {
    try {
      this.notification=await this.notificationsServices.getNotifications();
      console.log(this.notification);
     } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
     }
  }
 close(){
    this.closeModal.emit();
 }
}
