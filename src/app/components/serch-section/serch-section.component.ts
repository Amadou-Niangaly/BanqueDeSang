
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../filter.pipe';

@Component({
  selector: 'app-serch-section',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterPipe],
  templateUrl: './serch-section.component.html',
  styleUrl: './serch-section.component.css'
})
export class SerchSectionComponent {
  constructor() {}
 searchText:any;
 @Output() searchChanged=new EventEmitter<string>();

 onSearchChange() {
  this.searchChanged.emit(this.searchText);
}
 
}
