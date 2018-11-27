import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { Translation } from "../models/translation";
import { AppConstants } from "../constants";
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  compareFiles(formData: FormData): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${AppConstants.API_ENDPOINTS.COMPARE_FILES}`,
      formData
    );
  }

  fixTranslations(payload: Translation[], sessionKey: string): Observable<any> {
    //TODO: move to interceptor
    let headers = new HttpHeaders();
    headers = headers.set('Session-Key', sessionKey);
    let options = { headers: headers };

    return this.http.post(
      `${environment.apiUrl}${AppConstants.API_ENDPOINTS.FIX_TRANSLATIONS}`,
      payload,
      options
    );
  }
}
