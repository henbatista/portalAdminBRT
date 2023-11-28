import axios from "axios";
import useApiUrl from "~/composables/useApiUrl";
import toast from "~/plugins/toast";
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

export async function getAllTenants() {
  try {
    const authLocalStore = JSON.parse(localStorage.getItem("authStore") || "{}");
    const token = authLocalStore.token;

    const { data } = await axios.get(`${apiUrl}/api/v1/tenants`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    //console.log("Data from API:", data); 

    return { success: true, data: data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, error: error.response.data };
    } else { 
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}

export async function saveTenant(
  name: string, 
  corporate_name: string, 
  email: string, 
  phone: number, 
  cellphone: number, 
  cpf_cnpj: number,
  city_registration: string,
  state_registration: string,
  is_active: number,
  site: string,
  bank_billing_email: string,
  estimate_sales: number,
  segment: number,
  privacy_policy_accept: boolean,
  privacy_policy_accepted_at: boolean,
  parent_id: boolean,
  tenant_type:string,
  ) {
  try {
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      name: name,
      corporate_name: corporate_name,
      email: email,
      phone: phone,
      cellphone: cellphone,
      cpf_cnpj: cpf_cnpj,
      city_registration: city_registration,
      state_registration: state_registration,
      is_active: is_active,
      site: site,
      bank_billing_email: bank_billing_email,
      estimate_sales: estimate_sales,
      segment: segment,
      privacy_policy_accept: privacy_policy_accept,
      privacy_policy_accepted_at: privacy_policy_accepted_at,
      parent_id: parent_id,
      tenant_type: tenant_type,
      main: true,
    };
    const { data } = await axios.post(`${apiUrl}/api/v1/tenants`, axiosPayload, {
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

export async function deleteTenant(idTenant: number) {
  try {
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const { data } = await axios.delete(`${apiUrl}/api/v1/tenants/${idTenant}`, {
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

export async function updateTenant(
  slug_id: number,
  name: string,
  corporate_name: string,
  email: string,
  phone: string,
  cellphone: string,
  cpf_cnpj: string,
  city_registration: string,
  state_registration: string,
  is_active: boolean,
  site: string,
  bank_billing_email: string,
  estimate_sales: number,
  segment: number,
  privacy_policy_accept: boolean,
  privacy_policy_accepted_at: boolean,
  parent_id: boolean,
  tenant_type: string,
  idTenant: number
) {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    const axiosPayload = {
      slug_id: slug_id,
      name: name,
      corporate_name: corporate_name,
      email: email,
      phone: phone,
      cellphone: cellphone,
      cpf_cnpj: cpf_cnpj,
      city_registration: city_registration,
      state_registration: state_registration,
      is_active: is_active,
      site: site,
      bank_billing_email: bank_billing_email,
      estimate_sales: estimate_sales,
      segment: segment,
      privacy_policy_accept: privacy_policy_accept,
      privacy_policy_accepted_at: privacy_policy_accepted_at,
      parent_id: parent_id,
      idTenant: idTenant,
      tenant_type: tenant_type,
    };
    const { data } = await axios.put(
      `${apiUrl}/api/v1/tenants/${slug_id}`,
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