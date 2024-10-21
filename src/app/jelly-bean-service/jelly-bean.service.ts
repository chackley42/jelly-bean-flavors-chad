// jelly-bean.service.ts
import { Injectable } from '@angular/core';
import { JellyBean } from '../models/jelly-bean-model';

@Injectable({
  providedIn: 'root',
})
export class JellyBeanService {
  private localStorageKey = 'jellyBeans';
  private jellyBeans: JellyBean[] = [];

  constructor() {
    this.loadJellyBeansFromLocalStorage();
  }

  getJellyBeans(): JellyBean[] {
    return this.jellyBeans;
  }

  addJellyBean(jellyBean: JellyBean): void {
    //push to the end of the array
    this.jellyBeans.push(jellyBean);
    this.saveJellyBeansToLocalStorage();
  }

  editJellyBean(index: number, jellyBean: JellyBean): void {
    this.jellyBeans[index] = jellyBean;
    this.saveJellyBeansToLocalStorage();
  }
  
  updateJellyBean(updatedJellyBean: JellyBean): void {
    const index = this.jellyBeans.findIndex(jb => jb.id === updatedJellyBean.id);
    if (index !== -1) {
      this.jellyBeans[index] = updatedJellyBean;
      this.saveJellyBeans();
    }
  }

  private saveJellyBeans(): void {
    localStorage.setItem('jellybeanFlavors', JSON.stringify(this.jellyBeans));
  }

  deleteJellyBean(index: number): void {
    this.jellyBeans.splice(index, 1);
    this.saveJellyBeansToLocalStorage();
  }

  deleteAllJellyBeans(): void {
    this.jellyBeans.splice(0, this.jellyBeans.length);
    this.saveJellyBeansToLocalStorage();
  }

  private saveJellyBeansToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.jellyBeans));
  }

  private loadJellyBeansFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      this.jellyBeans = JSON.parse(data);
    }
  }
}
