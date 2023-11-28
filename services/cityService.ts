import axios from "axios";
import useApiUrl from "~/composables/useApiUrl";
import { useCityStore } from "../stores/CityStore";

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

export async function getAllCities() {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const { data } = await axios.get(`${apiUrl}/api/v1/cities`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data };
    } else {
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}

export async function saveCity(name: string, country_id: number, state_id: number, destination_type: string) {
  //console.log("Payload before request:", name, country_id, state_id, destination_type);
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
      state_id: state_id,
      destination_type: destination_type
    };

    // Faz uma requisição POST para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.post(`${apiUrl}/api/v1/cities`, axiosPayload, {
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
        return { success: false, error: "País já está cadastrado" };
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

export async function deleteCity(cityId: number) {
  try {
    // Obtém o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;

    // Faz uma requisição DELETE para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.delete(`${apiUrl}/api/v1/cities/${cityId}`, {
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

// Função para atualizar um estado existente
export async function updateCity(
  cityId: number,
  name: string,
  country_id: number,
  state_id: number,
  destination_type: string
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
      state_id: state_id,
      destination_type: destination_type
    };

    // Faz uma requisição PUT para a API de estados, incluindo o token de autorização nos cabeçalhos
    const { data } = await axios.put(
      `${apiUrl}/api/v1/cities/${cityId}`, 
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