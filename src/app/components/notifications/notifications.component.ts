import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
   
 @Input() notifications:{message:string;date:Date}[]=[];
 @Output() closeModal = new EventEmitter<void>();
isVisible: any;
 ngOnInit(): void {
     
 }
 close(){
    this.closeModal.emit();
 }
}
