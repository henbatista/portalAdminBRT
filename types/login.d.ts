type Permission =
  | "view home"
  | "view admin"
  | "view dashboard"
  | "view whoami"
  | "view travel rules"
  | "view document"
  | "view user"
  | "create user"
  | "edit user"
  | "delete user"
  | "edit role user"
  | "view role"
  | "create role"
  | "edit role"
  | "delete role"
  | "view permission"
  | "create permission"
  | "edit permission"
  | "delete permission"
  | "edit permission role"
  | "edit role permission"
  | "view customer"
  | "create customer"
  | "edit customer"
  | "edit address customer"
  | "delete customer"
  | "view branch"
  | "create branch"
  | "edit branch"
  | "delete branch"
  | "edit address branch"
  | "view tenant"
  | "create tenant"
  | "edit tenant"
  | "delete tenant"
  | "view place"
  | "view airport"
  | "create airport"
  | "edit airport"
  | "delete airport"
  | "edit city airport"
  | "view city"
  | "create city"
  | "edit city"
  | "delete city"
  | "edit airport city"
  | "view state"
  | "create state"
  | "edit state"
  | "delete state"
  | "view country"
  | "create country"
  | "edit country"
  | "delete country"
  | "view exchange"
  | "view currency"
  | "create currency"
  | "edit currency"
  | "delete currency"
  | "view contact"
  | "view terms"
  | "view budget"
  | "view my budget"
  | "view budgets"
  | "view bank"
  | "create bank"
  | "edit bank"
  | "delete bank"
  | "search city"
  | "search iata";

interface Address {
  // Adicione as propriedades de Address aqui
}

interface Product {
  // Adicione as propriedades de Product aqui
}

interface Tenant {
  id: string;
  slug_id: number;
  tenant_type: string;
  logo: string | null;
  name: string;
  corporate_name: string;
  email: string;
  phone: string;
  cellphone: string;
  cpf_cnpj: string;
  city_registration: string;
  state_registration: string;
  is_active: boolean;
  addresses: Address[];
  tenant_parent: Tenant | null;
  tenants_child: Tenant[];
  products: Product[];
}

export interface TenantData {
  id: string;
  name: string;
  email: string;
  rg: string | null;
  cpf: string | null;
  passport: string | null;
  passport_expiry: string | null;
  tenant_id: string;
  phone: string | null;
  cellphone: string | null;
  ext: string | null;
  mother_name: string | null;
  father_name: string | null;
  is_active: boolean;
  permissions: Permission[];
  tenant: Tenant;
  avatar: string;
}
