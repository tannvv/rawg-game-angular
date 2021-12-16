import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor http-header')
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': 'cbcd5b25aemsh5dfbffd2c7101a5p15340cjsn59034cdc1d3e',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },
      setParams: {
        key: '88d1913456894a3c80726e9eb454de9b',
      }
    });
    return next.handle(req);
  }
}
