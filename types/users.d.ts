// Definindo a interface para representar um usuário no sistema
interface User {
    id: string;                     // Identificador único do usuário
    avatar: string;                 // URL da imagem do avatar do usuário
    name: string;                   // Nome completo do usuário
    two_factor_auth: boolean;       // Indica se a autenticação de dois fatores está habilitada
    email: string;                  // Endereço de e-mail do usuário
    rg: any | null;                 // Número do RG do usuário ou nulo se não informado
    cpf: any | null;                // Número do CPF do usuário ou nulo se não informado
    passport: any | null;           // Número do passaporte do usuário ou nulo se não informado
    passport_expiry: any | null;    // Data de expiração do passaporte ou nulo se não informado
    tenant_id: string;              // Identificador único do locatário ao qual o usuário pertence
    phone: any | null;              // Número de telefone do usuário ou nulo se não informado
    cellphone: any | null;          // Número de celular do usuário ou nulo se não informado
    ext: any | null;                // Extensão telefônica do usuário ou nulo se não informado
    mother_name: any | null;        // Nome da mãe do usuário ou nulo se não informado
    father_name: any | null;        // Nome do pai do usuário ou nulo se não informado
    is_active: boolean;             // Indica se o usuário está ativo no sistema
    roles: Role;                   // Papéis (roles) atribuídos ao usuário
    permissions: Permission;          // Lista de permissões concedidas ao usuário
    tenant: Tenant;                 // Informações sobre o locatário ao qual o usuário pertence
    avatar: any | null;             // Dados adicionais sobre o avatar do usuário ou nulo se não informado
}

// Definindo a interface para representar as regras (roles) atribuídos a um usuário
interface Role {
    id: number;
    name: string;
    description: string;
    permissions: Permission;
}

interface Tenant {
    id: string;
    slug_id: string | null;
    tenant_type: string;
    logo: string | null;
    name: string;
    corporate_name: string;
    email: string;
    phone: string;
    cellphone: string;
    cpf_cnpj: string;
    city_registration: string | null;
    state_registration: string | null;
    is_active: boolean;
    addresses: Address[];
    tenant_parent: TenantParent | null;
    tenants_child: TenantChild[];
    products: any[]; // Define a estrutura correta para products
}

interface Permission {
    id: number;
    name: string;
    description: string;
}

// Exportando uma interface que representa uma lista de usuários
export interface ListUsers extends Array<User> {}


