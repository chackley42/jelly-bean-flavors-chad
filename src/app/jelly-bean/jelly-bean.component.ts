import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JellyBean } from '../models/jelly-bean-model'; // Adjust path as needed
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FlavorDialogComponent } from '../flavor-dialog/flavor-dialog.component';

@Component({
  selector: 'app-jelly-bean',
  templateUrl: './jelly-bean.component.html',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule], // Include any other necessary modules here
})
export class JellyBeanComponent {
  @Input() jellyBean!: JellyBean; // Expecting JellyBean input
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<JellyBean>();

  constructor(public dialog: MatDialog) {}

  onDelete() {
    this.delete.emit();
  }

  onEdit() {
    const dialogRef = this.dialog.open(FlavorDialogComponent, {
      width: '300px',
      data: { ...this.jellyBean }, // Pass a copy of the jellyBean to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edit.emit(result); // Emit the edited jelly bean
      }
    });
  }
}