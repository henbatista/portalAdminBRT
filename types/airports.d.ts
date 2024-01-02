export interface IAirport {
  id: number;
  name: string;
  iata: string;
  lat: any;
  long: any;
  cities: ICity[];
}

export interface ICity {
  id: number;
  name: string;
  state: string;
  state_id: number;
  country: string;
  country_id: number;
  destination_type: string;
}

export interface IListAirports extends Array<IAirport> {}
