
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JellyBean } from '../models/jelly-bean-model'; // Adjust path as needed
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-jelly-bean',
  templateUrl: './jelly-bean.component.html',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule], // Include any other necessary modules here
})
export class JellyBeanComponent {
  @Input() jellyBean!: JellyBean; // Expecting JellyBean input
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  onDelete() {
    this.delete.emit();
  }

  onEdit() {
    this.edit.emit();
  }
}
