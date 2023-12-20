export interface Tenant {
  id: string;
  slug_id: number;
  tenant_type: string;
  logo: any;
  name: string;
  segment: number;
  corporate_name: string;
  estimate_sales: number;
  email: string;
  parent_id: string;
  phone: string;
  cellphone: string;
  cpf_cnpj: string;
  city_registration: string;
  state_registration: string;
  is_active: boolean;
  tenant_parent: string;
  bank_billing_email: string;
  site: string;
  privacy_policy_accept: boolean;
  privacy_policy_accepted_at: boolean;
}

export interface ListTenants extends Array<Tenant> {}
