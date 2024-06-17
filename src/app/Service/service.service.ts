import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://localhost:8000/api/technique'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  getTechniques(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
