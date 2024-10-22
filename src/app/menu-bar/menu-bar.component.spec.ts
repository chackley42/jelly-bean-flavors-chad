// menu-bar.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlavorDialogComponent } from '../flavor-dialog/flavor-dialog.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
})
export class MenuBarComponent {
  constructor(public dialog: MatDialog) {}

  openAddFlavorDialog(): void {
    const dialogRef = this.dialog.open(FlavorDialogComponent, {
      width: '300px',
      data: null, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}