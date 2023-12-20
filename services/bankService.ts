import axios from "axios";
import useApiUrl from "~/composables/useApiUrl";
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

export async function getAllBanks() {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;
    const { data } = await axios.get(`${apiUrl}/api/v1/banks`, {
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

export async function saveBank(bankNumber: string, name: string) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      bank_number: bankNumber,
      name: name,
      main: true,
    };
    const { data } = await axios.post(`${apiUrl}/api/v1/banks`, axiosPayload, {
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

export async function deleteBank(idBank: number) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;
    const { data } = await axios.delete(`${apiUrl}/api/v1/banks/${idBank}`, {
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

export async function updateBank(
  idBank: number,
  bankNumber: string,
  name: string,
) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      bank_number: bankNumber,
      name: name,
      main: true,
    };
    const { data } = await axios.put(
      `${apiUrl}/api/v1/banks/${idBank}`,
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
      return { success: false, error: error.response.data };
    } else {
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}
