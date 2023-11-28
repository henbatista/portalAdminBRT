interface City {
  id: number;
  name: string;
  state: string;
  state_id: number;
  country: string;
  country_id: number;
  destination_type: string;
  airports: any[];
}

export interface ListCities extends Array<City> {}
