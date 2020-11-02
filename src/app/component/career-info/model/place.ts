export interface CountryModel {
  id: number;
  name: string;
}

export interface StateModel {
  id: number;
  name: string;
  countryId: number;
}

export interface CityModel {
  id: number;
  name: string;
  stateId: number;
}
