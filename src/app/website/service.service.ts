import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
import { User } from './interfaces/interface.user';
import { environment } from '../../environment/environment';
import { Project } from './interfaces/interface.project';
import { Charge } from './interfaces/interface.charges';
import { EmployeeDailyPrice } from './interfaces/interface.employeedailyprice';
import { Facture } from './interfaces/interface.facture';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public readonly apiUrlbase: string = environment.apiUrl;
  public readonly apiUrl: string = environment.apiUrl + '/api';

  constructor(private http: HttpClient) { }

  // Fetch CSRF token
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

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const xsrfToken = this.getXsrfTokenFromCookie();
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('X-XSRF-TOKEN', xsrfToken);
  }

  // Techniques
  getTechniques(): Observable<Technique[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Technique[]>(`${this.apiUrl}/techniques`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  getTechniqueById(id: BigInteger): Observable<Technique> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Technique>(`${this.apiUrl}/techniques/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Certifs
  getCertifs(): Observable<Certif[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Certif[]>(`${this.apiUrl}/certifs`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  getCertifById(id: number): Observable<Certif> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Certif>(`${this.apiUrl}/certifs/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createCertif(certif: FormData): Observable<Certif> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Certif>(`${this.apiUrl}/certifs`, certif, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateCertif(id: number, certif: Partial<Certif>): Observable<Certif> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Certif>(`${this.apiUrl}/certifs/${id}`, certif, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteCertif(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/certifs/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Expertises
  getExpertises(): Observable<Expertise[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Expertise[]>(`${this.apiUrl}/expertises`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createExpertise(expertise: FormData): Observable<Expertise> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Expertise>(`${this.apiUrl}/expertises`, expertise, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateExpertise(id: number, expertise: Partial<Expertise>): Observable<Expertise> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Expertise>(`${this.apiUrl}/expertises/${id}`, expertise, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteExpertise(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/expertises/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  uploadFile(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<{ path: string }>(`${this.apiUrl}/upload`, formData, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Personnes
  getPersonnes(): Observable<Personne[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Personne[]>(`${this.apiUrl}/personnes`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createPersonne(personne: FormData): Observable<Personne> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Personne>(`${this.apiUrl}/personnes`, personne, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updatePersonne(id: number, personne: Partial<Personne>): Observable<Personne> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Personne>(`${this.apiUrl}/personnes/${id}`, personne, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deletePersonne(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/personnes/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Partners
  getPartners(): Observable<Partner[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Partner[]>(`${this.apiUrl}/partners`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createPartner(partner: FormData): Observable<Partner> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Partner>(`${this.apiUrl}/partners`, partner, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updatePartner(id: number, partners: Partial<Partner>): Observable<Partner> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Partner>(`${this.apiUrl}/partners/${id}`, partners, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deletePartner(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/partners/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Stats
  getStats(): Observable<Stat[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Stat[]>(`${this.apiUrl}/stats`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createStat(stat: FormData): Observable<Stat> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Stat>(`${this.apiUrl}/stats`, stat, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateStat(id: number, stat: Partial<Stat>): Observable<Stat> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Stat>(`${this.apiUrl}/stats/${id}`, stat, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteStat(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/stats/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Contact Tel
  getContactsTel(): Observable<ContactTel[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<ContactTel[]>(`${this.apiUrl}/contactstel`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createTel(tel: ContactTel): Observable<ContactTel> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<ContactTel>(`${this.apiUrl}/contactstel`, tel, { headers, withCredentials: true }))
    );
  }

  updateTel(id: number, tel: Partial<ContactTel>): Observable<ContactTel> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<ContactTel>(`${this.apiUrl}/contactstel/${id}`, tel, { headers, withCredentials: true }))
    );
  }

  deleteTel(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/contactstel/${id}`, { headers, withCredentials: true }))
    );
  }

  // Contact Email
  getContactsEmail(): Observable<ContactEmail[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<ContactEmail[]>(`${this.apiUrl}/contactsemail`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createMail(mail: FormData): Observable<ContactEmail> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<ContactEmail>(`${this.apiUrl}/contactsemail`, mail, { headers, withCredentials: true }))
    );
  }

  updateMail(id: number, mail: Partial<ContactEmail>): Observable<ContactEmail> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<ContactEmail>(`${this.apiUrl}/contactsemail/${id}`, mail, { headers, withCredentials: true }))
    );
  }

  deleteMail(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/contactsemail/${id}`, { headers, withCredentials: true }))
    );
  }

  // Portfolios
  getPortfolios(): Observable<Portfolio[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Portfolio[]>(`${this.apiUrl}/portfolios`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createPortfolio(portfolio: FormData): Observable<Portfolio> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Portfolio>(`${this.apiUrl}/portfolios`, portfolio, { headers, withCredentials: true }))
    );
  }

  updatePortfolio(id: number, portfolio: Partial<Portfolio>): Observable<Portfolio> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Portfolio>(`${this.apiUrl}/portfolios/${id}`, portfolio, { headers, withCredentials: true }))
    );
  }

  deletePortfolio(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/portfolios/${id}`, { headers, withCredentials: true }))
    );
  }

  // Packs
  getPacks(): Observable<Pack[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Pack[]>(`${this.apiUrl}/pack`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Devis
  sendFormData(formData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post(`${this.apiUrl}/devis`, formData, { headers, withCredentials: true }))
    );
  }

  getForms(): Observable<any[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<any[]>(`${this.apiUrl}/devis`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteForm(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete(`${this.apiUrl}/devis/${id}`, { headers, withCredentials: true }))
    );
  }
 
  // Projects
  getProjectById(id: number): Observable<Project> {

    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Project>(`${this.apiUrl}/projects/${id}`, { headers:this.getAuthHeaders(), withCredentials: true })));
  }

  getProjects(): Observable<Project[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Project[]>(`${this.apiUrl}/projects`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createProject(project: FormData): Observable<Project> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Project>(`${this.apiUrl}/projects`, project, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateProject(id: number, project: FormData): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post(`${this.apiUrl}/projects/${id}`, project, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/projects/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // EmployeeDailyPrices
  getEmployeeDailyPricesByProject(projectId: number, date:string): Observable<EmployeeDailyPrice[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<EmployeeDailyPrice[]>(`${this.apiUrl}/employee-daily-prices/project/${projectId}/employees?date=${date}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createEmployeeDailyPrice(employee: any): Observable<EmployeeDailyPrice> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<EmployeeDailyPrice>(`${this.apiUrl}/employee-daily-prices`, employee, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateEmployeeDailyPrice(id: number, employee: any): Observable<EmployeeDailyPrice> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<EmployeeDailyPrice>(`${this.apiUrl}/employee-daily-prices/${id}`, employee, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteEmployeeDailyPrice(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/employee-daily-prices/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Charges
  getChargesByProject(projectId: number): Observable<Charge[]> {
    return this.getCsrfToken().pipe(
      switchMap(() =>  this.http.get<Charge[]>(`${this.apiUrl}'/projects/charges'${projectId}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createCharge(charge: any): Observable<Charge> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<Charge>(`${this.apiUrl}/charges`, charge, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateCharge(id: number, charge: any): Observable<Charge> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<Charge>(`${this.apiUrl}/charges/${id}`, charge, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteCharge(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/charges/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  createUser(user: FormData): Observable<User> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post<User>(`${this.apiUrl}/users`, user, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  updateUser(id: number, user: any): Observable<User> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<User>(`${this.apiUrl}/users/${id}`, user, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

   // Récupérer les détails de l'utilisateur connecté with CSRF and Auth headers
   getUserProfile(): Observable<User> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<User>(`${this.apiUrl}/user/profile`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  // Mettre à jour les informations de l'utilisateur with CSRF and Auth headers
  updateUserProfile(userData: User): Observable<User> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.put<User>(`${this.apiUrl}/user/profile`, userData, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  
  getProjectsForEmployee(employeeId: number): Observable<Project[]> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Project[]>(`/api/projects/for-employee/${employeeId}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  getFactureSinceStart(projectId: number): Observable<Facture> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Facture>(`${this.apiUrl}/factures/project/since-start/${projectId}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  getFacturePreviousMonth(projectId: number): Observable<Facture> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Facture>(`${this.apiUrl}/factures/project/previous-month/${projectId}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }

  getFacturePreviousYear(projectId: number): Observable<Facture> {
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.get<Facture>(`${this.apiUrl}/factures/project/previous-year/${projectId}`, { headers: this.getAuthHeaders(), withCredentials: true }))
    );
  }
  
}