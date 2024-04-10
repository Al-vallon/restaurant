
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  setItem(key: string, value: any, ttl?: number): void {
    if (this.isLocalStorageAvailable()) {
      const now = new Date().getTime();
      const expiration = (ttl || 3600000) + now; // 1 hour
      const data = {
        value: JSON.parse(value),
        expiration,
      };
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      const dataString = localStorage.getItem(key);
      if (dataString) {
        try {
          const data = JSON.parse(dataString);
          if (data.expiration > new Date().getTime()) {
            if (data.timestamp) {
              const minutes = Math.floor((data.timestamp - new Date().getTime()) / (1000 * 60));
              return { value: data.value, minutes };
            }
            return data.value;
          } else {
            this.removeItem(key);
            return null;
          }
        } catch (e) {
          console.error('Error parsing Local Storage data for key:', key, e);
          this.removeItem(key);
          return null;
        }
      }
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__testLocalStorageSupport__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}

  // setItem(key: string, value: any): void {
  //   if (this.isLocalStorageAvailable()) {
  //     localStorage.setItem(key, JSON.stringify(value));
  //   }
  // }


  // getItem(key: string): any {
  //   if (this.isLocalStorageAvailable()) {
  //     const item = localStorage.getItem(key);
  //     return item ? JSON.parse(item) : null;
  //   }
  //   return null;
  // }

  // removeItem(key: string): void {
  //   if (this.isLocalStorageAvailable()) {
  //     localStorage.removeItem(key);
  //   }
  // }

  // private isLocalStorageAvailable(): boolean {
  //   try {
  //     const testKey = '__testLocalStorageSupport__';
  //     localStorage.setItem(testKey, testKey);
  //     localStorage.removeItem(testKey);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
// }