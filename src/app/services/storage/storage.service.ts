import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem(key: string) {
    const item = localStorage.getItem(key) ?? undefined;
    return item;
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    return;
  }
}
