// Este código define funções para interagir com uma API relacionada a estados e países,
// utilizando a biblioteca Axios para fazer requisições HTTP. Além disso, o código
// faz uso de um token de autorização armazenado no localStorage.

// Importa as dependências necessárias
import axios, { AxiosError } from "axios";
import useApiUrl from "~/composables/useApiUrl";


// Obtém a URL da API por meio do hook useApiUrl
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

// Função para obter todos os Usuários
export async function getAllUser() {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;

    // Faz uma requisição GET para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.get(`${apiUrl}/api/v1/users`, {
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


// Função para salvar um novo Usuário
export async function saveUser(  
  name: string, 
  email:string,
  avatar: string,
  rg: string,
  cpf: string,
  password:string,
  password_confirmation: string,
  passport:string,
  passport_expiry:string,
  tenant_id: string,
  phone:string,
  cellphone: string,
  ext: string,
  mother_name: string,
  father_name:string,
  is_active : boolean) {
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
      email: email,
      avatar: avatar,
      rg: rg,
      cpf: cpf,
      password: password,
      password_confirmation: password_confirmation,
      passport:passport,
      passport_expiry:passport_expiry,
      tenant_id: tenant_id,
      phone:phone,
      cellphone: cellphone,
      ext: ext,
      mother_name: mother_name,
      father_name:father_name,
      is_active: is_active
    };

    // Faz uma requisição POST para a API de usuários, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.post(`${apiUrl}/api/v1/users`, axiosPayload, {
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
        return { success: false, error: "Usuário já está cadastrado" };
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


interface UpdateUserResponse {
  success: boolean;
  data?: any; // Tipo do objeto de dados retornado pela API
  error?: string | object; // Pode ser uma mensagem de erro ou detalhes específicos
}

// Função para atualizar um estado existente
export async function updateUser(
  id: string,
  name: string, 
  email:string,
  avatar: string,
  rg: string,
  cpf: string,
  password:string,
  password_confirmation: string,
  passport:string,
  passport_expiry:string,
  tenant_id: string,
  phone:string,
  cellphone: string,
  ext: string,
  mother_name: string,
  father_name:string,
  is_active : boolean
): Promise<UpdateUserResponse> {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(localStorage.getItem("authStore") || "{}");
    const token = authLocalStore.token;
    // Monta o payload para a requisição PUT
    const axiosPayload = {
      name,
      email,
      avatar,
      rg,
      cpf,
      password,
      password_confirmation,
      passport,
      passport_expiry,
      tenant_id,
      phone,
      cellphone,
      ext,
      mother_name,
      father_name,
      is_active,
    };

    // Faz uma requisição PUT para a API de estados, incluindo o token de autorização nos cabeçalhos
    const response = await axios.put(
      `${apiUrl}/api/v1/users/${id}`,
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

// Função para deletar um estado existente
export async function deleteUser(userid: string) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(  
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;

    // Faz uma requisição DELETE para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.delete(`${apiUrl}/api/v1/users/${userid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const elementToRemove = document.querySelector(`[data-index="${userid}"]`);
    if (elementToRemove) {
      elementToRemove.remove();
    }
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


