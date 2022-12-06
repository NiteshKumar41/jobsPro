import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          jobboss_token: `${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401 || err.status === 403) {
          // this.authService.logout();
          window.location.reload();
          localStorage.clear()
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
