
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import CareerInfoHttpService from './career-info.http.service';
import CareerInfoUrlService from './career-info.url.service';
import { CityModel, CountryModel, StateModel } from './model/place';

@Injectable()
export default class CareerInfoDataService {


  constructor(private careerInfoHttpService: CareerInfoHttpService) { }


  /**
   * @description
   * @returns countries data
   */
  public getCountriesData(): Observable<CountryModel[]> {
    return this.careerInfoHttpService.GET(CareerInfoUrlService.getCountriesUrl());
  }

  /**
   * @description
   * @returns states data
   */
  public getStatesData(countryId: number): Observable<StateModel[]> {
    return this.careerInfoHttpService.GET(CareerInfoUrlService.getStatesUrl(countryId));
  }

  /**
   * @description
   * @returns cities data
   */
  public getCitiesData(stateId: number): Observable<CityModel[]> {
    return this.careerInfoHttpService.GET(CareerInfoUrlService.getCitiesUrl(stateId));
  }

}
