import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const user = userService.currentUser;

  // Clone the request and add the authorization header if the user has a token
  if (user && user.token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${user.token}`,
      },
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req);
};
