import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagePreloadService {
  preloadImages(urls: string[]): void {
    for (let url of urls) {
      new Image().src = url;
    }
  }
}