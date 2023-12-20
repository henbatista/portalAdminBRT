// apiService.js
import axios from "axios";

interface CEPData {
  // Define the expected structure of the response data
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
  // Add other fields as needed
}

const cepService = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export const getCEPData = async (zipcode: string): Promise<CEPData> => {
  try {
    const response = await cepService.get(`${zipcode}/json/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
