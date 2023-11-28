 interface Cep {
    success: boolean;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
    erro?: boolean;
  }

  export interface ListCep extends Array<Cep> {}