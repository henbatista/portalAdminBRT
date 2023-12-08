// Importa as funções e módulos necessários do Vue e do arquivo de serviço
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAllTenants as getAllTenantsService,
  updateTenant as updateTenantService,
  deleteTenant as deleteTenantService,
  saveTenant as saveTenantService
} from "~/services/tenantService";
import { useToast } from "vue-toastification";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useMainStore } from "~/stores/MainStore";
import type { ListTenants } from "~/types/tenant";

// Define o store usando o Pinia
export const useTenantStore = defineStore("tenantStore", () => {
// Inicializa variáveis de estado e serviços
  const sidebarStoreTenant = useSidebarStoreTenant();
  const mainStore = useMainStore();

  // REF para armazenar as infos do Estados quando for fazer um UPDATE
  const idDeleteOrUpdate = ref("");// Inicialize com uma string vazia ou com o valor inicial desejado
  const idTenant = ref("");
  const slug_id = ref("");
  const name = ref("");
  const corporate_name = ref("");
  const email = ref("");
  const phone = ref<string>("");
  const cellphone = ref<string>("");
  const cpf_cnpj = ref("");
  const city_registration = ref("");
  const state_registration = ref("");
  const is_active = ref();
  const site  = ref("");
  const bank_billing_email = ref("");
  const estimate_sales = ref(0);
  const segment = ref(0);
  const privacy_policy_accept = ref(false);
  const privacy_policy_accepted_at = ref(false);
  const parent_id = ref();
  const tenant_type = ref("");

  const tenants = ref<ListTenants | null>(null);
  
  const toast = useToast();
  const isLoading = ref(true);

    // Busca todos os inquilinos na API
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
      // Tratamento de erro genérico
      toast.error("Erro ao obter a lista de Estados");
      // Tratamento de erro de conexão à internet desconectada
      if (error instanceof Error && error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("Você está desconectado da internet. Verifique sua conexão e tente novamente.");
      } else {
        // tratamento de erro de validação
        toast.error("Ocorreu um erro ao obter a lista de clientes. Tente novamente mais tarde.");
      }
      return { error };
    } finally {
      isLoading.value = false;
    }
  }
  

  // Salva um novo inquilino na API
  async function saveTenant(    
    slug_id: string,
    name: string,
    corporate_name: string,
    email: string,
    phone: string,
    cellphone: string,
    cpf_cnpj: string,
    is_active: number,
    site: string,
    bank_billing_email: string,
    estimate_sales: number,
    segment: number,
    privacy_policy_accept: boolean,
    privacy_policy_accepted_at: boolean,
    parent_id: boolean,
    tenant_type: string, ) {
    console.log("Saving state:", name)
    isLoading.value = true;
    try {
      const response = await saveTenantService(      
        name,
        corporate_name,
        email,
        phone,
        cellphone,
        cpf_cnpj,
        is_active,
        site,
        bank_billing_email,
        estimate_sales,
        segment,
        privacy_policy_accept,
        privacy_policy_accepted_at,
        parent_id,
        tenant_type
        );
      if (response.success) {
        getAllTenants(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        toast.success("Banco cadastrados com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    }  catch (error) { 
      // Tratamento de erro genérico
      toast.error("Erro ao salvar o país");
      // Tratamento de erro de conexão à internet desconectada
      if (error instanceof Error && error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("Você está desconectado da internet. Verifique sua conexão e tente novamente.");
      } else {
        // tratamento de erro de rede
        if (error instanceof Error && error.message.includes("NetworkError")) {

          toast.error("Erro de rede ao salvar o país. Verifique sua conexão e tente novamente.");
        } else if (error instanceof Error && error.message.includes("ValidationError")) {
          // tratamento de erro de validação
          toast.error("Erro de validação ao salvar o país. Verifique os dados inseridos.");
        } else {
          // Tratamento de outros erros
          toast.error("Ocorreu um erro ao salvar o país. Tente novamente mais tarde.");
        }
      }
    } finally {
      isLoading.value = false;
    }
  }

  // Atualiza um inquilino existente na API
  async function updateTenant(   
    idTenant: string,
    slug_id: string,
    name: string,
    corporate_name: string,
    email: string,
    phone: string,
    cellphone: string,
    cpf_cnpj: string,
    is_active: number,
    site: string,
    bank_billing_email: string,
    estimate_sales: number,
    segment: number,
    privacy_policy_accept: boolean,
    privacy_policy_accepted_at: boolean,
    parent_id: boolean,
    tenant_type: string, ) {
    try {
      const response = await updateTenantService(
        idDeleteOrUpdate.value,
        slug_id,
        name,
        corporate_name,
        email,
        phone,
        cellphone,
        cpf_cnpj,
        is_active,
        site,
        bank_billing_email,
        estimate_sales,
        segment,
        privacy_policy_accept,
        privacy_policy_accepted_at,
        parent_id,
        tenant_type
      );
      if (response.success) {
      
        sidebarStoreTenant.sideBarActionTenant = false;
        slug_id = "",
        name = "",
        corporate_name = "",
        email = "",
        phone = "",
        cellphone = "",
        cpf_cnpj = "",
        is_active =1,
        site = "",
        bank_billing_email = "",
        estimate_sales = 0,
        segment = 1,
        privacy_policy_accept = false,
        privacy_policy_accepted_at = false,
        parent_id = false,
        tenant_type = "",
        idDeleteOrUpdate.value = "";
        toast.success("Cliente atualizado com sucesso!");
        getAllTenants(); 
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    }  catch (error) {
      toast.error("Erro ao atualizar o Estado. Por favor, tente novamente.");
    }
  }

  
  // Deleta um inquilino da API
  async function deleteTenant() {
    isLoading.value = true;
    try {
      const response = await deleteTenantService(idDeleteOrUpdate.value);
      if (response.success) {
        getAllTenants(); 
        sidebarStoreTenant.sideBarActionTenant = false;
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
        idDeleteOrUpdate.value = "";
        toast.success("Cliente deletado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }

  // Retorna as variáveis e funções que devem ser acessíveis fora do store
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
    saveTenant
  };
});
