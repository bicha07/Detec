import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certif } from './website/interfaces/interface.certif';
import { Technique } from './website/interfaces/interface.technique';
import { Expertise } from './website/interfaces/interface.expertise';
import { Personne } from './interfaces/interface.personne';
import { Partner } from './website/interfaces/interface.partner';
import { Stat } from './website/interfaces/interface.stat';
import { ContactTel } from './website/interfaces/interface.contactTel';
import { ContactEmail } from './website/interfaces/interface.contactEmail';
import { Portfolio } from './website/interfaces/interface.portfolio';
import { Pack } from './website/interfaces/interface.pack';



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
  // Create a new expertise
  createExpertise(expertise: FormData): Observable<Expertise> {
    return this.http.post<Expertise>(`${this.apiUrl}/expertises`, expertise);
  }

  updateExpertise(id: number, expertise: FormData): Observable<Expertise> {
    return this.http.put<Expertise>(`${this.apiUrl}/expertises/${id}`, expertise);
  }

  // Delete an expertise
  deleteExpertise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expertises/${id}`);
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
  getExpertises(): Observable<Expertise[]> {
    const url = `${this.apiUrl}/expertises`; // Endpoint spécifique
    return this.http.get<Expertise[]>(url);
  }
  getPersonnes(): Observable<Personne[]> {
    const url = `${this.apiUrl}/personnes`; // Endpoint spécifique
    return this.http.get<Personne[]>(url);
  }
  getPartners(): Observable<Partner[]> {
    const url = `${this.apiUrl}/partners`; // Endpoint spécifique
    return this.http.get<Partner[]>(url);
  }
  getStats(): Observable<Stat[]> {
    const url = `${this.apiUrl}/stats`; // Endpoint spécifique
    return this.http.get<Stat[]>(url);
  }
  getContactsTel(): Observable<ContactTel[]> {
    const url = `${this.apiUrl}/contactstel`; // Endpoint spécifique
    return this.http.get<ContactTel[]>(url);
  }
  getContactsEmail(): Observable<ContactEmail[]> {
    const url = `${this.apiUrl}/contactsemail`; // Endpoint spécifique
    return this.http.get<ContactEmail[]>(url);
  }
  getPortfolios(): Observable<Portfolio[]> {
    const url = `${this.apiUrl}/portfolios`; // Endpoint spécifique
    return this.http.get<Portfolio[]>(url);
  }
  getPacks(): Observable<Pack[]> {
    const url = `${this.apiUrl}/pack`; // Endpoint spécifique
    return this.http.get<Pack[]>(url);
  }
}
