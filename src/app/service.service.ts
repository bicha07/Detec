import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certif } from './Service/interfaces/interface.certif';
import { Technique } from './Service/interfaces/interface.technique';
import { Expertise } from './Service/interfaces/interface.expertise';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  getTechniques(): Observable<Technique[]> {
    const url = `${this.apiUrl}/techniques`; // Endpoint spécifique
    return this.http.get<Technique[]>(url);
  }
  getCertifs(): Observable<Certif[]> {
    const url = `${this.apiUrl}/certifs`; // Endpoint spécifique
    return this.http.get<Certif[]>(url);
  }
  getTechniqueById(id: BigInteger): Observable<Technique> {
    const url = `${this.apiUrl}/techniques/${id}`; // Endpoint spécifique pour récupérer une technique par ID
    return this.http.get<Technique>(url);
  }
  getCertifById(id: BigInteger): Observable<Certif> {
    const url = `${this.apiUrl}/certifs/${id}`; // Endpoint spécifique pour récupérer une technique par ID
    return this.http.get<Certif>(url);
  }
  getExpertises(): Observable<Certif[]> {
    const url = `${this.apiUrl}/expertises`; // Endpoint spécifique
    return this.http.get<Certif[]>(url);
  }
}
