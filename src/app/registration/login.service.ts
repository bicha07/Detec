import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public readonly baseUrl: string = environment.apiUrl
  public readonly apiUrl: string = environment.apiUrl + '/api';
  constructor(private http: HttpClient) { }

  // Fetch CSRF token
  private getCsrfToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sanctum/csrf-cookie`, { withCredentials: true });
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
        return this.http.post(`${this.apiUrl}/login`, loginData, { headers, withCredentials: true });
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
}
