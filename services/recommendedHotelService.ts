// Este código define funções para interagir com uma API relacionada aos Hotéis Recomendados,
// utilizando a biblioteca Axios para fazer requisições HTTP. Além disso, o código
// faz uso de um token de autorização armazenado no localStorage.

// Importa as dependências necessárias
import axios, { AxiosError } from "axios";
import useApiUrl from "~/composables/useApiUrl";
import type { HotelRecommended } from "../types/recommendedHotels"; // Altere o caminho conforme a estrutura do seu projeto

// Obtém a URL da API por meio do hook useApiUrl
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

// Função para salvar um novo Hotel Recomendado
export async function saveRecommendedHotel(
  recommendedHotels: HotelRecommended,
) {
  try {
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );

    const token = authLocalStore.token;
    console.log(
      "Tentando salvar recommendedHotels:",
      recommendedHotels.idHotel,
    );

    const axiosPayload = {
      ...recommendedHotels,
    };
    console.log("recommendedHotels:", axiosPayload.idHotel);
    const { data } = await axios.post(
      `${apiUrl}/api/v1/hoteisrecomendados/cadastrar`,
      axiosPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return { success: true, data: data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        return { success: false, error: "Hotel já está cadastrado" };
      } else {
        return { success: false, error: data || "Erro desconhecido" };
      }
    } else {
      return { success: false, error: "Ocorreu um erro inesperado" };
    }
  }
}

// Interface para atualizar um Hotel Recomendado existente
interface UpdateHotelRecommendedResponse {
  success: boolean;
  data?: any; // Tipo do objeto de dados retornado pela API
  error?: string | object; // Pode ser uma mensagem de erro ou detalhes específicos
}

// Função para Autualizar um Hotel Recomendado existente
export async function updateRecommendedHotel(
  hotel: HotelRecommended,
): Promise<UpdateHotelRecommendedResponse> {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;

    // Faz uma requisição PUT para a API de Hotel Recomendado, incluindo o token de autorização nos cabeçalhos
    const response = await axios.patch(
      `${apiUrl}/api/v1/hoteisrecomendados/atualizar`,
      hotel,
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

// Função para deletar um Hotel Recomendado existente
export async function deleteRecommendedHotel(hotelId: number) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;

    // Faz uma requisição DELETE para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.delete(
      `${apiUrl}/api/v1/hoteisrecomendados/deletar/${hotelId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
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
