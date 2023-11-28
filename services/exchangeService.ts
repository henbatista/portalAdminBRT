import axios from "axios";
import { useAuthStore } from "../stores/AuthStore";

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

export async function getAllExchanges() {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const { data } = await axios.get(`${apiUrl}/api/v1/exchanges`, {
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

export async function saveExchanges(usd: string, eur: string, gbp: string) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      EUR: eur,
      GBP: gbp,
      USD: usd,
    };
    const { data } = await axios.post(
      `${apiUrl}/api/v1/exchanges`,
      axiosPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { success: true, data: data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data };
    } else {
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}
