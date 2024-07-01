import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Certif } from './website/interfaces/interface.certif';
import { Technique } from './website/interfaces/interface.technique';
import { Expertise } from './website/interfaces/interface.expertise';
import { Personne } from './website/interfaces/interface.personne';
import { Partner } from './website/interfaces/interface.partner';
import { Stat } from './website/interfaces/interface.stat';
import { ContactTel } from './website/interfaces/interface.contactTel';
import { ContactEmail } from './website/interfaces/interface.contactEmail';
import { Portfolio } from './website/interfaces/interface.portfolio';
import { Pack } from './website/interfaces/interface.pack';
import { User } from './website/interfaces/interface.user';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public readonly apiUrlbase: string = environment.apiUrl;
  public readonly apiUrl: string = environment.apiUrl + '/api';

  constructor(private http: HttpClient) { }

  private getCsrfToken(): Observable<any> {
    return this.http.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
  }

  private getXsrfTokenFromCookie(): string {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private setHeaders(): HttpHeaders {
    return new HttpHeaders().set('X-XSRF-TOKEN', this.getXsrfTokenFromCookie());
  }

  getTechniques(): Observable<Technique[]> {
    const url = `${this.apiUrl}/techniques`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Technique[]>(url, { withCredentials: true }))
    );
  }

  getTechniqueById(id: BigInteger): Observable<Technique> {
    const url = `${this.apiUrl}/techniques/${id}`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Technique>(url, { withCredentials: true }))
    );
  }

  getCertifs(): Observable<Certif[]> {
    const url = `${this.apiUrl}/certifs`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Certif[]>(url, { withCredentials: true }))
    );
  }

  getCertifById(id: number): Observable<Certif> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Certif>(`${this.apiUrl}/certifs/${id}`, { withCredentials: true }))
    );
  }

  createCertif(certif: FormData): Observable<Certif> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Certif>(`${this.apiUrl}/certifs`, certif, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updateCertif(id: number, certif: Partial<Certif>): Observable<Certif> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Certif>(`${this.apiUrl}/certifs/${id}`, certif, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deleteCertif(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/certifs/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getExpertises(): Observable<Expertise[]> {
    const url = `${this.apiUrl}/expertises`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Expertise[]>(url, { withCredentials: true }))
    );
  }

  createExpertise(expertise: FormData): Observable<Expertise> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Expertise>(`${this.apiUrl}/expertises`, expertise, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updateExpertise(id: number, expertise: Partial<Expertise>): Observable<Expertise> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Expertise>(`${this.apiUrl}/expertises/${id}`, expertise, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  uploadFile(file: File): Observable<{ path: string }> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<{ path: string }>(`${this.apiUrl}/upload`, formData, { headers: this.setHeaders(), withCredentials: true });
      })
    );
  }

  deleteExpertise(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/expertises/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getPersonnes(): Observable<Personne[]> {
    const url = `${this.apiUrl}/personnes`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Personne[]>(url, { withCredentials: true }))
    );
  }

  createPersonne(personne: FormData): Observable<Personne> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Personne>(`${this.apiUrl}/personnes`, personne, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updatePersonne(id: number, personne: Partial<Personne>): Observable<Personne> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Personne>(`${this.apiUrl}/personnes/${id}`, personne, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deletePersonne(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/personnes/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getPartners(): Observable<Partner[]> {
    const url = `${this.apiUrl}/partners`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Partner[]>(url, { withCredentials: true }))
    );
  }

  createPartner(partner: FormData): Observable<Partner> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Partner>(`${this.apiUrl}/partners`, partner, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updatePartner(id: number, partners: Partial<Partner>): Observable<Partner> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Partner>(`${this.apiUrl}/partners/${id}`, partners, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deletePartner(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/partners/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getStats(): Observable<Stat[]> {
    const url = `${this.apiUrl}/stats`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Stat[]>(url, { withCredentials: true }))
    );
  }

  createStat(stat: FormData): Observable<Stat> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Stat>(`${this.apiUrl}/stats`, stat, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updateStat(id: number, stats: Partial<Stat>): Observable<Stat> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Stat>(`${this.apiUrl}/stats/${id}`, stats, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deleteStat(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/stats/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getContactsTel(): Observable<ContactTel[]> {
    const url = `${this.apiUrl}/contactstel`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<ContactTel[]>(url, { withCredentials: true }))
    );
  }

  createTel(tel: ContactTel): Observable<ContactTel> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<ContactTel>(`${this.apiUrl}/contactstel`, tel, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updateTel(id: number, tels: Partial<ContactTel>): Observable<ContactTel> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<ContactTel>(`${this.apiUrl}/contactstel/${id}`, tels, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deleteTel(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/contactstel/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getContactsEmail(): Observable<ContactEmail[]> {
    const url = `${this.apiUrl}/contactsemail`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<ContactEmail[]>(url, { withCredentials: true }))
    );
  }

  createMail(mail: FormData): Observable<ContactEmail> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<ContactEmail>(`${this.apiUrl}/contactsemail`, mail, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updateMail(id: number, mails: Partial<ContactEmail>): Observable<ContactEmail> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<ContactEmail>(`${this.apiUrl}/contactsemail/${id}`, mails, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deleteMail(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/contactsemail/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getPortfolios(): Observable<Portfolio[]> {
    const url = `${this.apiUrl}/portfolios`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Portfolio[]>(url, { withCredentials: true }))
    );
  }

  createPortfolio(portfolio: FormData): Observable<Portfolio> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Portfolio>(`${this.apiUrl}/portfolios`, portfolio, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updatePortfolio(id: number, portfolios: Partial<Portfolio>): Observable<Portfolio> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Portfolio>(`${this.apiUrl}/portfolios/${id}`, portfolios, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deletePortfolio(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/portfolios/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getPacks(): Observable<Pack[]> {
    const url = `${this.apiUrl}/pack`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Pack[]>(url, { withCredentials: true }))
    );
  }

  sendFormData(formData: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post(`${this.apiUrl}/devis`, formData, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getForms(): Observable<any[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<any[]>(`${this.apiUrl}/devis`, { withCredentials: true }))
    );
  }

  deleteForm(id: number): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete(`${this.apiUrl}/devis/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/users`;
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<User[]>(url, { withCredentials: true }))
    );
  }

  addUser(user: FormData): Observable<User> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<User>(`${this.apiUrl}/users`, user, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put(`${this.apiUrl}/users/${id}`, user, { headers: this.setHeaders(), withCredentials: true }))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers: this.setHeaders(), withCredentials: true }))
    );
  }
}
