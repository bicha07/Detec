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
  // // Create a new expertise
  // createExpertise(expertise: Expertise): Observable<Expertise> {
  //   return this.http.post<Expertise>(`${this.apiUrl}/expertises`, expertise);
  // }

  // // Update an existing expertise
  // updateExpertise(id: BigInt, expertise: Partial<Expertise>): Observable<Expertise> {
  //   return this.http.put<Expertise>(`${this.apiUrl}/expertises/${id.toString()}`, expertise);
  // }
  createExpertise(expertise: FormData): Observable<Expertise> {
    return this.http.post<Expertise>(`${this.apiUrl}/expertises`, expertise);
  }

  updateExpertise(id: number, expertise: Partial<Expertise>): Observable<Expertise> {
    return this.http.put<Expertise>(`${this.apiUrl}/expertises/${id}`, expertise);
  }
  uploadFile(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ path: string }>(`${this.apiUrl}/upload`, formData);
}
  // Delete an expertise
  deleteExpertise(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/expertises/${id}`);
  }

//////////////////////


  getPersonnes(): Observable<Personne[]> {
    const url = `${this.apiUrl}/personnes`; // Endpoint spécifique
    return this.http.get<Personne[]>(url);
  }

  createPersonne(personne: FormData): Observable<Personne> {
    return this.http.post<Personne>(`${this.apiUrl}/personnes`, personne);
  }

  updatePersonne(id: number, personne: Partial<Personne>): Observable<Personne> {
    return this.http.put<Personne>(`${this.apiUrl}/personnes/${id}`, personne);
  }

  // Delete an expertise
  deletePersonne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/personnes/${id}`);
  }
  

  ///////////////////////



  getPartners(): Observable<Partner[]> {
    const url = `${this.apiUrl}/partners`; // Endpoint spécifique
    return this.http.get<Partner[]>(url);
  }

  createPartner(partner: FormData): Observable<Partner> {
    return this.http.post<Partner>(`${this.apiUrl}/partners`, partner);
  }

  updatePartner(id: number, partners: Partial<Partner>): Observable<Partner> {
    return this.http.put<Partner>(`${this.apiUrl}/partners/${id}`, partners);
  }

  // Delete an expertise
  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/partners/${id}`);
  }



  /////////////////


  getStats(): Observable<Stat[]> {
    const url = `${this.apiUrl}/stats`; // Endpoint spécifique
    return this.http.get<Stat[]>(url);
  }

  createStat(stat: FormData): Observable<Stat> {
    return this.http.post<Stat>(`${this.apiUrl}/stats`, stat);
  }

  updateStat(id: number, stats: Partial<Stat>): Observable<Stat> {
    return this.http.put<Stat>(`${this.apiUrl}/stats/${id}`, stats);
  }

  // Delete an expertise
  deleteStat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/stats/${id}`);
  }



  //////////////////////////
  getContactsTel(): Observable<ContactTel[]> {
    const url = `${this.apiUrl}/contactstel`; // Endpoint spécifique
    return this.http.get<ContactTel[]>(url);
  }

  createTel(tel: FormData): Observable<ContactTel> {
    return this.http.post<ContactTel>(`${this.apiUrl}/tels`, tel);
  }

  updateTel(id: number, tels: Partial<ContactTel>): Observable<ContactTel> {
    return this.http.put<ContactTel>(`${this.apiUrl}/tels/${id}`, tels);
  }

  // Delete an expertise
  deleteTel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tels/${id}`);
  }


  ////////////////////////

  
  getContactsEmail(): Observable<ContactEmail[]> {
    const url = `${this.apiUrl}/contactsemail`; // Endpoint spécifique
    return this.http.get<ContactEmail[]>(url);
  }

  createMail(mail: FormData): Observable<ContactEmail> {
    return this.http.post<ContactEmail>(`${this.apiUrl}/contactsemail`, mail);
  }

  updateMail(id: number, mails: Partial<ContactEmail>): Observable<ContactEmail> {
    return this.http.put<ContactEmail>(`${this.apiUrl}/contactsemail/${id}`, mails);
  }

  // Delete an expertise
  deleteMail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contactsemail/${id}`);
  }


  ///////////////////



  getPortfolios(): Observable<Portfolio[]> {
    const url = `${this.apiUrl}/portfolios`; // Endpoint spécifique
    return this.http.get<Portfolio[]>(url);
  }

  createPortfolio(portfolio: FormData): Observable<Portfolio> {
    return this.http.post<Portfolio>(`${this.apiUrl}/portfolios`, portfolio);
  }

  updatePortfolio(id: number, portfolios: Partial<Portfolio>): Observable<Portfolio> {
    return this.http.put<Portfolio>(`${this.apiUrl}/portfolios/${id}`, portfolios);
  }

  // Delete an expertise
  deletePortfolio(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/portfolios/${id}`);
  }


  /////////////////
  getPacks(): Observable<Pack[]> {
    const url = `${this.apiUrl}/pack`; // Endpoint spécifique
    return this.http.get<Pack[]>(url);
  }


}
