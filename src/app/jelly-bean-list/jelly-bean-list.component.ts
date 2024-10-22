import { Component, OnInit } from '@angular/core';
import { JellyBean } from '../models/jelly-bean-model'; 
import { CommonModule } from '@angular/common';
import { JellyBeanComponent } from '../jelly-bean/jelly-bean.component'; 
import { JellyBeanService } from '../jelly-bean-service/jelly-bean.service';

@Component({
  selector: 'jelly-bean-list',
  templateUrl: './jelly-bean-list.component.html',
  standalone: true,
  imports: [CommonModule, JellyBeanComponent], 
})
export class JellyBeanListComponent implements OnInit {
  jellyBeans: JellyBean[] = []; 
  jellyBean: JellyBean | undefined;

  constructor(private jellyBeanService: JellyBeanService) {}

  ngOnInit(): void {
    this.loadJellyBeans();
  }

  loadJellyBeans(): void {
    this.jellyBeans = this.jellyBeanService.getJellyBeans();
  }

  deleteJellyBean(index: number): void {
    this.jellyBeanService.deleteJellyBean(index);
    this.loadJellyBeans(); 
  }

  editJellyBean(index: number, editedJellyBean: JellyBean): void {
    this.jellyBeans[index] = editedJellyBean;
    this.jellyBeanService.updateJellyBean(editedJellyBean);
    this.loadJellyBeans(); 
  }
}