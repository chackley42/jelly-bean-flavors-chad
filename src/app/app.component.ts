import { Component } from '@angular/core';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { JellyBeanListComponent } from './jelly-bean-list/jelly-bean-list.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,  
  imports: [MenuBarComponent, JellyBeanListComponent, MatButtonModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Jelly Bean Flavor Creator';
}
