import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LocalStorageService } from '../../../infrastructure/services/local/local-storage.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.getToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 && !req.url.includes('/login')) {
        localStorage.clear();

        alert('Tiempo de sesión expirado, por favor, vuelva a iniciar sesión');

        window.location.href = '/login';
      }

      return throwError(() => error);
    })
  );
};
