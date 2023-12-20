interface Country {
  id: number;
  name: string;
  formal_name: string;
  phone_code: number;
  iso: string;
  iso3: string;
}

export interface ListCountries extends Array<Country> {}
