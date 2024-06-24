import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }
  registerUser(registrationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, registrationData);
  }
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
  forgotPassword(identifier: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { identifier });
  }
}