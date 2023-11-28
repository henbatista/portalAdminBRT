import axios from "axios";

import { useCountryStore } from "../stores/CountryStore";

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

export async function getAllCountries() {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const { data } = await axios.get(`${apiUrl}/api/v1/countries`, {
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

export async function saveCountry(name: string, formal_name: string, phone_code: number, iso: string, iso3: string) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      name: name,
      formal_name: formal_name,
      phone_code: phone_code,
      iso: iso,
      iso3: iso3
    };
    const { data } = await axios.post(`${apiUrl}/api/v1/countries`, axiosPayload, {
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

export async function deleteCountry(countryId: number) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const { data } = await axios.delete(`${apiUrl}/api/v1/countries/${countryId}`, {
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

export async function updateCountry(
  countryId: number,
  name: string,
  formal_name: string,
  phone_code: number,
  iso: string,
  iso3: string
) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      name: name,
      formal_name: formal_name,
      phone_code: phone_code,
      iso: iso,
      iso3: iso3,
      countryId: countryId

    };
    const { data } = await axios.put(
      `${apiUrl}/api/v1/countries/${countryId}`,
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
