import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements Storage {
  private dbContext: Storage;

  constructor() {
    this.dbContext = localStorage;
  }
  get length() {
    return this.dbContext.length;
  }

  set storageContext(storage: Storage) {
    const isStanceOfStorage = storage instanceof Storage;

    if (!isStanceOfStorage) throw Error('Storage is not instance of Storage');

    this.dbContext = storage;
  }

  clear(): void {
    throw new Error('Method not implemented.');
  }
  key(index: number): string | null {
    throw new Error('Method not implemented.');
  }
  removeItem(key: string): void {
    throw new Error('Method not implemented.');
  }

  getItem(key: string): string | null {
    const item = this.dbContext.getItem(key) ?? null;
    return item;
  }

  setItem(key: string, value: string) {
    this.dbContext.setItem(key, value);
  }
}
