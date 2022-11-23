import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    storageService = new StorageService();
  });

  it('should save item in local storage', () => {
    const key = 'testing';
    const value = 'lorem!';
    storageService.setItem(key, value);
    const item = localStorage.getItem(key) ?? '';

    expect(value).toBe(item);
  });

  it('should get item from local storage', () => {
    const key = 'testing';
    const value = 'lorem!';
    localStorage.setItem(key, value);

    const item = storageService.getItem(key) ?? '';

    expect(value).toBe(item);
  });
});
