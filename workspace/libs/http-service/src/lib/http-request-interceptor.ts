import { ApiMessage, ApiMessageType, ApiResponse } from '@valencia/common';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, switchMap } from 'rxjs/operators';

export class HttpRequestInterceptor implements HttpInterceptor {
  displayToUser = true;
  doNotDisplayToUser = false;

  constructor() {} // add private security service;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // determine if request requires security information;
    // add security information to request (i.e., bearer token, header items, etc.)

    // return this.securityService.identity$.pipe(
    //   switchMap(user => {
    //     if (user && user.access_token) {
    //       req = req.clone({
    //         setHeaders: {
    //           Authorization: `Bearer ${user.access_token}`
    //         }
    //       });
    //     }
    //     return next.handle(request);
    //   })
    // );
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer 1234134abcdef0987023945`,
      },
    });
    return next.handle(request);
  }
}
