interface Bank {
  id: number;
  bank_number: string;
  name: string;
  main: boolean;
}

export interface ListBanks extends Array<Bank> {}
