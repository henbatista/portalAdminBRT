// Importa as funções e módulos necessários do Vue e do arquivo de serviço
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAllUser as getAllUserService,
  saveState as saveStatesService,
  deleteUser as deleteUserService,
  updateState as updateStatesService,
} from "~/services/usersService";
import { useToast } from "vue-toastification";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useMainStore } from "~/stores/MainStore";
import type { ListUsers } from "~/types/users";

// Define o store usando o Pinia
export const useUserStore = defineStore("userStore", () => {
  // Inicializa variáveis de estado e serviços
  const sidebarStoreTenant = useSidebarStoreTenant();
  const mainStore = useMainStore();
  

  // REF para armazenar as infos do Estados quando for fazer um UPDATE
  const idDeleteOrUpdate = ref(""); // Inicialize com uma string vazia ou com o valor inicial desejado
  const name = ref("");
  const idTenant = ref("");
  const id = ref("");
  const country_id = ref()

  const users = ref<ListUsers | null>(null);
  const toast = useToast();
  const isLoading = ref(true);

  // Busca todos os Usuários na API
  async function getAllUser() {
    isLoading.value = true;
    try {
      //console.log("Fetching tenants...");
      const response = await getAllUserService();
      //console.log("Response from service:", response); 
      if (response.success) {
        users.value = response.data.data;
      } else {
        toast.error("Problemas em carregar lista de Usuários!");
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast.error("Erro ao obter a lista de usuários");
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
  async function saveStates(
    name: string, 
    country_id: number | null) {
    console.log("Saving Usuário:", name);
    isLoading.value = true;
    try {
      if (!name || !country_id) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      const response = await saveStatesService(
        name, 
        country_id );
      if (response.success) {
        getAllUser(); // Chama o getAllCountry para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        toast.success("Estado cadastrado com sucesso!");
      } else {
        toast.error("Preencha todos os campos obrigatórios");
        //console.log(name, country_id)
        isLoading.value = false;
      }
    } catch (error) { 
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

  async function updateStates(name: string, country_id: number ) {
    try {
      if (!name || !country_id ) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      const response = await updateStatesService(
        idDeleteOrUpdate.value,
        name, 
        country_id
      );
      if (response.success) {
        getAllUser(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        name = "",
        country_id = 0,
        idDeleteOrUpdate.value = "";
        toast.success("Estado atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    }  catch (error) {
      toast.error("Erro ao atualizar o Estado. Por favor, tente novamente.");
    }
  }
  

  async function deleteUser() {
    isLoading.value = false;
    try {
      // Verifica se o ID a ser deletado é válido
      const response = await deleteUserService(idDeleteOrUpdate.value);
      if (response.success) {
 
        sidebarStoreTenant.sideBarActionTenant = false;
        mainStore.openDeleteModal = false;
        name.value = "",
        idDeleteOrUpdate.value = "";
        toast.success("Usuário deletado com sucesso!");
        // Encontre o elemento com a chave correspondente (item_id) e remova-o do DOM

      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {
      toast.error("Erro ao deletar o Usuário. Por favor, tente novamente.");
    }
  }
  
  return {
    users,
    idDeleteOrUpdate,
    isLoading,
    getAllUser,
    saveStates,
    deleteUser,
    updateStates,
    name,
    country_id, 
  };
});
