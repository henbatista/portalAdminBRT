interface StateComplete {
    country_id:      number;
    name:    string;
}

export interface ListStatesComplete extends Array<StateComplete> {}
