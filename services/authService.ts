import axios from "axios";
import tete from '@/composables/useApiUrl'

const { getApiUrl } = tete();
const apiUrl = getApiUrl();

export async function login(email: string, password: string) {
  try {
    const { data } = await axios.post(`${apiUrl}/api/v1/login`, {
      email,
      password,
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
