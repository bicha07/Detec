import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public readonly apiUrl: string = environment.apiUrl + '/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Fetch CSRF token
  private getCsrfToken(): Observable<any> {
    return this.http.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const xsrfToken = this.getXsrfTokenFromCookie();
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('X-XSRF-TOKEN', xsrfToken);
  }

  registerUser(user: FormData): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.getCsrfToken().pipe(
      switchMap(() => this.http.post(`${this.apiUrl}/users`, user, { headers, withCredentials: true }))
    );
  }

  loginUser(loginData: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('X-XSRF-TOKEN', this.getXsrfTokenFromCookie());
        return this.http.post(`${this.apiUrl}/login`, loginData, { headers, withCredentials: true }).pipe(
          tap((response: any) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          })
        );
      })
    );
  }

  forgotPassword(identifier: string): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const headers = new HttpHeaders().set('X-XSRF-TOKEN', this.getXsrfTokenFromCookie());
        return this.http.post(`${this.apiUrl}/forgot-password`, { identifier }, { headers, withCredentials: true });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
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
  isUserAdmin(): boolean {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.role === 'admin';
  }
  
  isUserEmployee(): boolean {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.role === 'employee';
  }
  public setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user); // safely updating the BehaviorSubject
  }
}
