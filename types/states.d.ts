interface State {
    id:      number;
    name:    string;
    country: string;
}

export interface ListStates extends Array<State> {}
