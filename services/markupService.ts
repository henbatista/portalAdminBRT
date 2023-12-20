// Este código define funções para interagir com uma API relacionada a Markups,
// utilizando a biblioteca Axios para fazer requisições HTTP. Além disso, o código
// faz uso de um token de autorização armazenado no localStorage.

// Importa as dependências necessárias
import axios, { AxiosError } from "axios";
import useApiUrl from "~/composables/useApiUrl";
import type { Markup, ListMarkups } from '../types/markup'; // Altere o caminho conforme a estrutura do seu projeto


// Obtém a URL da API por meio do hook useApiUrl
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

// Função para obter todos os Markup
export async function getAllMarkup() {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;

    // Faz uma requisição GET para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.get(`${apiUrl}/api/v1/markups`, {
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
export async function saveMarkup(markup: Markup) {
  try {
    const authLocalStore = JSON.parse(
      localStorage.getItem('authStore') || '{}',
    );
    
    const token = authLocalStore.token;
    console.log('Tentando salvar markup:', markup.markup_title);

    
    const axiosPayload = {
      ...markup,
      markup_commission: markup.markup_commission.map((commission) => ({ ...commission })),
      markup_rules: markup.markup_rules.map((rules) => ({ ...rules })),
      
    };
    
    console.log('Markup Commission:', axiosPayload.markup_commission);
    console.log('Markup Rules:', axiosPayload.markup_rules);
    const { data } = await axios.post(
      `${apiUrl}/api/v1/markups`,
      axiosPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { success: true, data: data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        return { success: false, error: 'Markup já está cadastrado' };
      } else {
        return { success: false, error: data || 'Erro desconhecido' };
      }
    } else {
      return { success: false, error: 'Ocorreu um erro inesperado' };
    }
  }
}

interface UpdateMarkupResponse {
  success: boolean;
  data?: any; // Tipo do objeto de dados retornado pela API
  error?: string | object; // Pode ser uma mensagem de erro ou detalhes específicos
}

export async function updateMarkup(markup: Markup): Promise<UpdateMarkupResponse> {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;

    // Faz uma requisição PUT para a API de markups, incluindo o token de autorização nos cabeçalhos
    const response = await axios.put(
      `${apiUrl}/api/v1/markups/${markup.markup_id}`,
      markup,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Retorna um objeto indicando o sucesso da operação e os dados obtidos
    return { success: true, data: response.data };
  } catch (error) {
    // Trata erros específicos do Axios
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      // Retorna um objeto indicando o fracasso da operação e detalhes do erro
      return {
        success: false,
        error: axiosError.response?.data || "An unexpected error occurred",
      };
    } else {
      // Caso contrário, retorna um objeto indicando um erro inesperado
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}

interface DeleteMarkupResponse {
  success: boolean;
  data?: any; // Adapte conforme necessário para os dados retornados pela API
  error?: string; // Adapte conforme necessário para o tipo de erro retornado pela API
}
// Função para deletar um estado existente
export async function deleteMarkup(markupId: string): Promise<DeleteMarkupResponse> {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;

    // Faz uma requisição DELETE para a API de markup, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.delete(`${apiUrl}/api/v1/markups/${markupId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Remove o elemento do DOM, se necessário
    const elementToRemove = document.querySelector(`[data-index="${markupId}"]`);
    if (elementToRemove) {
      elementToRemove.remove();
    }

    // Retorna um objeto indicando o sucesso da operação e os dados obtidos
    return { success: true, data };
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
