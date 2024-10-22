import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JellyBean } from '../models/jelly-bean-model'; 
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FlavorDialogComponent } from '../flavor-dialog/flavor-dialog.component';

@Component({
  selector: 'app-jelly-bean',
  templateUrl: './jelly-bean.component.html',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule], 
})
export class JellyBeanComponent {
  @Input() jellyBean!: JellyBean; 
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<JellyBean>();

  constructor(public dialog: MatDialog) {}

  onDelete() {
    this.delete.emit();
  }

  onEdit() {
    const dialogRef = this.dialog.open(FlavorDialogComponent, {
      width: '300px',
      data: { ...this.jellyBean }, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edit.emit(result); 
      }
    });
  }
}