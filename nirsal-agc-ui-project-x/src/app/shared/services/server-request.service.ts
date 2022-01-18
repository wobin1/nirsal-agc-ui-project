import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ServerRequestService {

  private serverUrlEndpoint = 'http://100.24.253.36/v1/';  // URL to web api
  private headers = {};
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { 
  }

  setHeaders(headers: any = {}): void {
    this.headers = headers;
  }

  get(url: any): Observable<any> {
    return this.http.get<any>(this.serverUrlEndpoint+url, {
      headers: this.headers
    })
  }

  post(url: any, data: any): Observable<any> {
    return this.http.post<any>(this.serverUrlEndpoint+url, data, {
      headers: this.headers
    });
  }

  processResponse(response): any {
    if (response.errorStatus != false){
      return false;
    }
    else {
      return response.contentData;
    }
  }

  handleError(response): any {
    alert("A server error has occurred");
  }

  sanitizeImage(base64: any): any {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
  }
}
