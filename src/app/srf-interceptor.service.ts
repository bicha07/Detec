import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xsrfToken = this.getCookie('XSRF-TOKEN');
    console.log('CSRF Token:', xsrfToken); // Log the CSRF token
    if (xsrfToken) {
      req = req.clone({
        setHeaders: {
          'X-XSRF-TOKEN': xsrfToken
        },
        withCredentials: true
      });
    }
    return next.handle(req);
  }

  private getCookie(name: string): string | null {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }
}
