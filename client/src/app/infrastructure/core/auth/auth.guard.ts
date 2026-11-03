import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { LocalStorageService } from '../../services/local/local-storage.service';

export const authGuard: CanActivateFn = () => {

  const router = inject(Router);

  const localStorageService = inject(LocalStorageService);

  const token = localStorageService.getToken();

  if (!token) {

    router.navigate(['/login']);

    return false;
  }

  return true;
};