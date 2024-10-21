import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlavorDialogComponent } from '../flavor-dialog/flavor-dialog.component';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { faker } from '@faker-js/faker';
import { JellyBeanService } from '../jelly-bean-service/jelly-bean.service'; // Adjust the path as needed
import { JellyBean } from '../models/jelly-bean-model'; // Adjust the path as needed

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  standalone: true,
  imports: [MatIcon, MatButtonModule],
})
export class MenuBarComponent {
  jellyBeans: JellyBean[] = [];

  constructor(
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private jellyBeanService: JellyBeanService // Inject the service
  ) {
    this.matIconRegistry.addSvgIcon(
      'byu',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/byu.svg')
    );
    this.loadJellyBeans();
  }

  openAddFlavorDialog(): void {
    const dialogRef = this.dialog.open(FlavorDialogComponent, {
      width: '300px',
      data: null, // No data for adding a new jellybean
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jellyBeanService.addJellyBean(result); // Add the new jelly bean
        this.loadJellyBeans(); // Reload jelly beans after adding a new one
      }
    });
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
    this.loadJellyBeans(); // Reload jelly beans after adding a new one
  }

  deleteAll(): void {
    this.jellyBeanService.deleteAllJellyBeans()
  }

  private saveFlavorToLocalStorage(flavor: string): void {
    let flavors = JSON.parse(localStorage.getItem('jellybeanFlavors') || '[]');
    flavors.push(flavor);
    localStorage.setItem('jellybeanFlavors', JSON.stringify(flavors));
    this.loadJellyBeans(); // Reload jelly beans after saving a new one
  }

  private loadJellyBeans(): void {
    this.jellyBeans = JSON.parse(localStorage.getItem('jellybeanFlavors') || '[]');
  }

  onEditJellyBean(editedJellyBean: JellyBean): void {
    const index = this.jellyBeans.findIndex(jb => jb.id === editedJellyBean.id);
    if (index !== -1) {
      this.jellyBeans[index] = editedJellyBean;
      localStorage.setItem('jellybeanFlavors', JSON.stringify(this.jellyBeans));
    }
  }
}