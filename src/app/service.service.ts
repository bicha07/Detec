import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Certif } from './interfaces/interface.certif';
import { Technique } from './interfaces/interface.technique';
import { Expertise } from './interfaces/interface.expertise';
import { Personne } from './interfaces/interface.personne';
import { Partner } from './interfaces/interface.partner';
import { Stat } from './interfaces/interface.stat';
import { ContactTel } from './interfaces/interface.contactTel';
import { ContactEmail } from './interfaces/interface.contactEmail';
import { Portfolio } from './interfaces/interface.portfolio';
import { Pack } from './interfaces/interface.pack';



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
    const url = `${this.apiUrl}/porfolio`; // Endpoint spécifique
    return this.http.get<Portfolio[]>(url);
  }
  getPacks(): Observable<Pack[]> {
    const url = `${this.apiUrl}/pack`; // Endpoint spécifique
    return this.http.get<Pack[]>(url);
  }
}
