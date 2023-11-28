interface ExchangeRate {
  created_at: string;
  USD: string;
  EUR: string;
  GBP: string;
}

export interface ListExchangeRates extends Array<ExchangeRate> {}
