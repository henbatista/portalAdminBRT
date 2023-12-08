// Este código define funções para interagir com uma API relacionada a estados e países,
// utilizando a biblioteca Axios para fazer requisições HTTP. Além disso, o código
// faz uso de um token de autorização armazenado no localStorage.

// Importa as dependências necessárias
import axios from "axios";
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
export async function saveState(name: string, country_id: number) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;

    // Monta o payload para a requisição POST
    const axiosPayload = {
      name: name,
      country_id: country_id,
      main: true,
    };

    // Faz uma requisição POST para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.post(`${apiUrl}/api/v1/states`, axiosPayload, {
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

// Função para atualizar um estado existente
export async function updateState(
  stateId: string,
  name: string,
  country_id: number
) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;

    // Monta o payload para a requisição PUT
    const axiosPayload = {
      name: name,
      country_id: country_id,
    };

    // Faz uma requisição PUT para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.put(
      `${apiUrl}/api/v1/states/${stateId}`,
      axiosPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
