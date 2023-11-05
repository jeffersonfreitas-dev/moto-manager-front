import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {


  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const apiToken = this.keycloakService.getKeycloakInstance().token;
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${apiToken}`,
    //   },
    // });
    return next.handle(request);
  }
}
