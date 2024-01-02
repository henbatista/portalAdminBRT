// Arquivo: AuthStoreType.ts

export interface AuthStoreType {
    token: string | null;       // Token de autenticação
    user: User | null;          // Informações do usuário autenticado
    isAuthenticated: boolean;   // Estado de autenticação
    // Outras propriedades e métodos relacionados à autenticação podem ser adicionados aqui
  }
  
  // Definição básica do tipo de usuário
  export interface User {
    id: string;
    name: string;
    email: string;
    // Adicione outras propriedades relevantes para o usuário
  }

  export interface IListAuth extends Array<AuthStoreType> {}
