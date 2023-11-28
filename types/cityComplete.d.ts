interface CityComplete {
    state_id:  number;
    name:      string;
}

export interface ListCityComplete extends Array<CityComplete> {}
