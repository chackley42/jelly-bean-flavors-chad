import { Component, OnInit } from '@angular/core';
import { JellyBean } from '../models/jelly-bean-model'; // Adjust path as needed
import { CommonModule } from '@angular/common';
import { JellyBeanComponent } from '../jelly-bean/jelly-bean.component'; // Import the JellyBeanComponent
import { JellyBeanService } from '../jelly-bean-service/jelly-bean.service'; // Import the JellyBeanService

@Component({
  selector: 'app-jelly-bean-list',
  templateUrl: './jelly-bean-list.component.html',
  standalone: true,
  imports: [CommonModule, JellyBeanComponent], // Import necessary modules and JellyBeanComponent
})
export class JellyBeanListComponent implements OnInit {
  jellyBeans: JellyBean[] = []; // Initialize your jellyBeans array

  constructor(private jellyBeanService: JellyBeanService) {}

  ngOnInit(): void {
    this.loadJellyBeans();
  }

  loadJellyBeans(): void {
    this.jellyBeans = this.jellyBeanService.getJellyBeans();
  }

  // This method deletes the jelly bean at the specified index
  deleteJellyBean(index: number): void {
    this.jellyBeanService.deleteJellyBean(index);
    this.loadJellyBeans(); // Refresh the list after deletion
  }

  // This method would handle editing the jelly bean
  editJellyBean(index: number): void {
    // Implement edit logic here
  }
}