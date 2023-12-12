interface User {
  
    name: string;
    email: string;
    avatar: string;
    rg: string;
    cpf: string;
    password: string;
    password_confirmation: string;
    passport: string;
    passport_expiry: string;
    tenant_id: string;
    phone: string;
    cellphone: string;
    ext: string;
    mother_name: string;
    father_name: string;
    is_active: boolean;
  }

  export interface ListUsers extends Array<User> {}
