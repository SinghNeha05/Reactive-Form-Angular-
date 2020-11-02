/**
 *
 *
*/

import { Injectable } from '@angular/core';

import {
  DEFAULT_HOST_URL,
  COUNTRIES_INFORMATION_URL,
  STATES_INFORMATION_URL,
  CITIES_INFORMATION_URL
} from '../../constant/app.constant';

@Injectable()
export default class CareerInfoUrlService {

  /**
   * @description
   * @returns countries url
   */
  public static getCountriesUrl(): string {

    return DEFAULT_HOST_URL.concat(COUNTRIES_INFORMATION_URL);

  }

  /**
   * @description
   * @returns states url
   */
  public static getStatesUrl(countryId: number): string {

    return DEFAULT_HOST_URL.concat(STATES_INFORMATION_URL, '/', countryId.toString());

  }

  /**
   * @description
   * @returns cities url
   */
  public static getCitiesUrl(stateId: number): string {

    return DEFAULT_HOST_URL.concat(CITIES_INFORMATION_URL, '/', stateId.toString());

  }


}
