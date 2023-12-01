import { defineStore } from "pinia";
import { ref } from "vue";

import {
  getAllTenants as getAllTenantsService,
  updateTenant as updateTenantService,
  deleteTenant as deleteTenantService,
 
} from "~/services/tenantService";

import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";
import type { ListTenants } from "~/types/tenant";

export const useTenantStore = defineStore("tenantStore", () => {
  const sidebarStore = useSidebarStore();
  const mainStore = useMainStore();
  const idDeleteOrUpdate = ref();
  const slug_id = ref(0);
  const name = ref("");
  const corporate_name = ref("");
  const email = ref("");
  const phone = ref<string>("");
  const cellphone = ref<string>("");
  const cpf_cnpj = ref("");
  const city_registration = ref("");
  const state_registration = ref("");
  const is_active = ref(false);
  const site  = ref("");
  const bank_billing_email = ref("");
  const estimate_sales = ref(0);
  const segment = ref(0);
  
  
  const privacy_policy_accept = ref(false);
  const privacy_policy_accepted_at = ref(false);
  const parent_id = ref();
  const tenant_type = ref("");
  const idTenant = ref(0);

  const tenants = ref<ListTenants | null>(null);
  const toast = useToast();
  const isLoading = ref(true);

  async function getAllTenants() {
    try {
      //console.log("Fetching tenants...");
      const response = await getAllTenantsService();
  
      //console.log("Response from service:", response); 
  
      if (response.success) {
        tenants.value = response.data.data;
        //console.log("Tenants data:", tenants.value); 
      } else {
        toast.error("Problemas em carregar lista de Clientes!");
      }
    } catch (error) {
      toast.error("Error fetching tenants"); 
      return { error };
    } finally {
      isLoading.value = false;
    }
  }

  async function updateTenant() {
    try {
      const response = await updateTenantService(
        slug_id.value,
        name.value,
        corporate_name.value,
        email.value,
        phone.value,
        cellphone.value,
        cpf_cnpj.value,
        city_registration.value,
        state_registration.value,
        is_active.value,
        site.value,
        bank_billing_email.value,
        estimate_sales.value,
        segment.value,
        privacy_policy_accept.value,
        privacy_policy_accepted_at.value,
        parent_id.value,
        tenant_type.value,
        idDeleteOrUpdate.value,
      );
      if (response.success) {
        getAllTenants();
        sidebarStore.sideBarAction = false;
        slug_id.value ,
        name.value  = "",
        corporate_name.value  = "",
        email.value  = "",
        phone.value  = "",  
        cellphone.value  = "",  
        cpf_cnpj.value  = "",  
        city_registration.value  = "",
        state_registration.value  = "",
        is_active.value ,
        site.value  = "",
        bank_billing_email.value  = "",
        estimate_sales.value ,
        segment.value ,
        privacy_policy_accept.value ,
        privacy_policy_accepted_at.value ,
        parent_id.value = "",
        tenant_type.value = "",
        idDeleteOrUpdate.value = 0;
        toast.success("Banco atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }


  async function deleteTenant() {
    isLoading.value = true;
    try {
      const response = await deleteTenantService(idDeleteOrUpdate.value);
      if (response.success) {
        getAllTenants(); 
        sidebarStore.sideBarAction = false;
        mainStore.openDeleteModal = false;
        slug_id.value ,
        name.value  = "",
        corporate_name.value  = "",
        email.value  = "",
        phone.value  = "",  
        cellphone.value  = "",  
        cpf_cnpj.value  = "",  
        city_registration.value  = "",
        state_registration.value  = "",
        is_active.value ,  
        site.value  = "",
        bank_billing_email.value  = "",
        estimate_sales.value ,
        segment.value ,
        privacy_policy_accept.value ,
        privacy_policy_accepted_at.value ,
        parent_id.value = "",
        tenant_type.value = "",
        idDeleteOrUpdate.value = 0;
        toast.success("Cliente deletado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }


  return {
    tenants,
    idDeleteOrUpdate,
    isLoading,
    getAllTenants,
    deleteTenant,
    name,
    slug_id,
    corporate_name,
    email,
    phone,
    cellphone,
    cpf_cnpj,
    city_registration,
    state_registration,
    is_active,
    site,
    bank_billing_email,
    estimate_sales,
    segment,
    privacy_policy_accept,
    privacy_policy_accepted_at,
    parent_id,
    tenant_type,
    updateTenant,
  };
});
