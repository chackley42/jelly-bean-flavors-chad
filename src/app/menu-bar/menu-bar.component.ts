import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlavorDialogComponent } from '../flavor-dialog/flavor-dialog.component';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { faker } from '@faker-js/faker';
import { JellyBeanService } from '../jelly-bean-service/jelly-bean.service';
import { JellyBean } from '../models/jelly-bean-model';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
})
export class MenuBarComponent {
  constructor(
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private jellyBeanService: JellyBeanService 
  ) {
    this.matIconRegistry.addSvgIcon(
      'byu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/cosmo-byu-royal-svg')
    );
  }

  openAddFlavorDialog(): void {
    const dialogRef = this.dialog.open(FlavorDialogComponent, {
      width: '300px',
      data: null, 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveFlavorToLocalStorage(result);
      }
    });
  }

  //create a deleteAllFunction that deletes all the flavors
  deleteAll(): void {
    this.jellyBeanService.deleteAllJellyBeans();
  }

  getRandomColor(): string {
    const colorRanges = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'white'];
    const selectedRange = colorRanges[Math.floor(Math.random() * colorRanges.length)];
  
    let color: string;
    switch (selectedRange) {
      case 'red':
        color = `rgb(${Math.floor(Math.random() * 256)}, 0, 0)`;
        break;
      case 'blue':
        color = `rgb(0, 0, ${Math.floor(Math.random() * 256)})`;
        break;
      case 'green':
        color = `rgb(0, ${Math.floor(Math.random() * 256)}, 0)`;
        break;
      case 'yellow':
        color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0)`;
        break;
      case 'purple':
        color = `rgb(${Math.floor(Math.random() * 256)}, 0, ${Math.floor(Math.random() * 256)})`;
        break;
      case 'pink':
        color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 128)}, ${Math.floor(Math.random() * 128)})`;
        break;
      case 'orange':
        color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 165)}, 0)`;
        break;
      case 'white':
        color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        break;
      default:
        color = faker.internet.color(); // Fallback to faker's color if something goes wrong
    }
  
    return color;
  }

  getRandomAdjective(): string {
    const adjectives = [
      faker.commerce.productAdjective(),
      faker.hacker.adjective(),
      faker.word.adjective()
    ];
    return adjectives[Math.floor(Math.random() * adjectives.length)];
  }

  generateRandomJellyBean(): void {
    const randomAdj = this.getRandomAdjective();
    const randomFlavor = (() => {
      const options = [
        faker.food.fruit(),
        faker.food.ingredient(),
        faker.food.spice(),
        faker.food.vegetable(),
        faker.food.meat(),
        faker.food.dish(),
      ];
      return options[Math.floor(Math.random() * options.length)];
    })();
    const randomColor = this.getRandomColor();

    const newJellyBean: JellyBean = {
      id: Date.now(), // Generate a unique ID
      flavor: `${randomAdj} ${randomFlavor}`,
      color: randomColor,
    };
    this.jellyBeanService.addJellyBean(newJellyBean);
  }

  private saveFlavorToLocalStorage(flavor: string): void {
    let flavors = JSON.parse(localStorage.getItem('jellybeanFlavors') || '[]');
    flavors.push(flavor);
    localStorage.setItem('jellybeanFlavors', JSON.stringify(flavors));
  }
}