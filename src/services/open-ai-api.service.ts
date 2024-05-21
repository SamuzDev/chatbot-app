import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments';

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {

  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  public sendMessage(message: string) {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message });
  }
}