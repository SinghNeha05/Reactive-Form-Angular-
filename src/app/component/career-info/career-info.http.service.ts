/**
 * @author Neha Singh
 * @description
 */

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { API_RESPONSE_TYPE } from '../../constant/app.constant';

@Injectable()
export default class CareerInfoHttpService {

  constructor(private httpClient: HttpClient) { }

  /**
   * @param url
   * @returns API Response
   * @description This GET function is used to get the API response
   */
  public GET(url: string): Observable<any> {

    return this.httpClient.get(url, { responseType: API_RESPONSE_TYPE, withCredentials: true });

  }


}
