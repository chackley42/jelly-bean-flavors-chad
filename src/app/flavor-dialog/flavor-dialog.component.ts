// // flavor-dialog.component.ts
// import { CommonModule } from '@angular/common';
// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-flavor-dialog',
//   templateUrl: './flavor-dialog.component.html',
//   standalone: true,
//   imports: [ MatFormFieldModule, MatInputModule, CommonModule, FormsModule ],
// })
// export class FlavorDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<FlavorDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSave(): void {
//     // Save the jellybean data and close the dialog
//     this.dialogRef.close(this.data);
//   }
// }

// flavor-dialog.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { JellyBeanService } from '../jelly-bean-service/jelly-bean.service'; // Import the service
import { JellyBean } from '../models/jelly-bean-model'; // Import the model
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-flavor-dialog',
  templateUrl: './flavor-dialog.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule, MatIcon, MatButtonModule, ColorPickerModule, MatOption],
})
export class FlavorDialogComponent {
  flavor: string;
  color: string;

  constructor(
    public dialogRef: MatDialogRef<FlavorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JellyBean
  ) {
    // Initialize the flavor and color with the data passed to the dialog
    this.flavor = data?.flavor || '';
    this.color = data?.color || '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const editedJellyBean: JellyBean = {
      id: this.data?.id || Date.now(), // Use the existing ID
      flavor: this.flavor,
      color: this.color,
    };
    this.dialogRef.close(editedJellyBean); // Close the dialog and pass the edited jellybean
  }
}