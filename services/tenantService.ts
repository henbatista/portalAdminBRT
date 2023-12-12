// Este código define funções para interagir com uma API relacionada a clientes,
// utilizando a biblioteca Axios para fazer requisições HTTP. Além disso, o código
// faz uso de um token de autorização armazenado no localStorage.

// Importa as dependências necessárias
import axios, { AxiosError } from 'axios';
import useApiUrl from "~/composables/useApiUrl";

// Obtém a URL da API por meio do hook useApiUrl
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

// Função para obter todos os Clientes
export async function getAllTenants() {
  try {
     // Obtém o token do localStorage
    const authLocalStore = JSON.parse(localStorage.getItem("authStore") || "{}");
    const token = authLocalStore.token;

    // Faz uma requisição GET para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.get(`${apiUrl}/api/v1/tenants`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("Data from API:", data); 
    // Retorna um objeto indicando o sucesso da operação e os dados obtidos
    return { success: true, data: data };
  } catch (error) {
    // Trata erros específicos do Axios e retorna um objeto indicando o fracasso da operação e detalhes do erro
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data };
    } else { 
    // Caso contrário, retorna um objeto indicando um erro inesperado
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}

// Função para salvar um novo Cliente
export async function saveTenant(  
  name: string, 
  corporate_name: string, 
  email: string, 
  phone: string, 
  cellphone: string, 
  cpf_cnpj: string,
  is_active: number,
  site: string,
  bank_billing_email: string,
  estimate_sales: number,
  segment: number,
  privacy_policy_accept: boolean,
  privacy_policy_accepted_at: boolean,
  parent_id: boolean,
  tenant_type:string,
  
  ) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    console.log("Tentando salvar locatário:", name);

    // Monta o payload para a requisição POST
    const axiosPayload = {
      name: name,
      corporate_name: corporate_name,
      email: email,
      phone: phone,
      cellphone: cellphone,
      cpf_cnpj: cpf_cnpj,
      is_active: is_active,
      site: site,
      bank_billing_email: bank_billing_email,
      estimate_sales: estimate_sales,
      segment: segment,
      privacy_policy_accept: privacy_policy_accept,
      privacy_policy_accepted_at: privacy_policy_accepted_at,
      parent_id: parent_id,
      tenant_type: tenant_type,
      main: true,
    };

    // Faz uma requisição POST para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.post(`${apiUrl}/api/v1/tenants`, axiosPayload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // Retorna um objeto indicando o sucesso da operação e os dados obtidos
    return { success: true, data: data };
  } catch (error) {
    // Trata erros específicos do Axios
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;

      if (status === 422) {
        // Se o status for 422, trata como páis já cadastrado
        return { success: false, error: "Estado já está cadastrado" };
      } else {
        // Outros códigos de erro podem ser tratados aqui conforme necessário
        return { success: false, error: data || "Erro desconhecido" };
      }
    } else {
      // Caso contrário, retorna um objeto indicando um erro inesperado
      return { success: false, error: "Ocorreu um erro inesperado" };
    }
  }
}

interface UpdateTenantResponse {
  success: boolean;
  data?: any; // Tipo do objeto de dados retornado pela API
  error?: string | object; // Pode ser uma mensagem de erro ou detalhes específicos
}


export async function updateTenant(
  id: string,
  slug_id: string,
  name: string,
  corporate_name: string,
  email: string,
  phone: string,
  cellphone: string,
  cpf_cnpj: string,
  is_active: number,
  site: string,
  bank_billing_email: string,
  estimate_sales: number,
  segment: number,
  privacy_policy_accept: boolean,
  privacy_policy_accepted_at: boolean,
  parent_id: boolean,
  tenant_type: string,
): Promise<UpdateTenantResponse> {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(localStorage.getItem("authStore") || "{}");
    const token = authLocalStore.token;
    // Monta o payload para a requisição PUT
    const axiosPayload = {
      id,
      slug_id,
      name,
      corporate_name,
      email,
      phone,
      cellphone,
      cpf_cnpj,
      is_active,
      site,
      bank_billing_email,
      estimate_sales,
      segment,
      privacy_policy_accept,
      privacy_policy_accepted_at,
      parent_id,
      tenant_type,
    };

    // Faz uma requisição PUT para a API de locatários, incluindo o token de autorização nos cabeçalhos
    const response = await axios.put(
      `${apiUrl}/api/v1/tenants/${id}`,
      axiosPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Retorna um objeto indicando o sucesso da operação e os dados obtidos
    return { success: true, data: response.data };
  } catch (error) {
    // Trata erros específicos do Axios
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      // Retorna um objeto indicando o fracasso da operação e detalhes do erro
      return { success: false, error: axiosError.response?.data || "An unexpected error occurred" };
    } else {
      // Caso contrário, retorna um objeto indicando um erro inesperado
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}

export async function deleteTenant(idTenant: string) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;

    // Faz uma requisição DELETE para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.delete(`${apiUrl}/api/v1/tenants/${idTenant}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Retorna um objeto indicando o sucesso da operação e os dados obtidos
    return { success: true, data: data };
  } catch (error) {
    // Trata erros específicos do Axios e retorna um objeto indicando o fracasso da operação e detalhes do erro
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data };
    } else {
      // Caso contrário, retorna um objeto indicando um erro inesperado
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}



