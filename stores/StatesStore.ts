
import { defineStore } from "pinia";
import { ref } from "vue";
import type { ListStates } from "~/types/states";
import {
  getAllStates as getAllStatesService,
  saveState as saveStatesService,
  deleteState as deleteStatesService,
  updateState as updateStatesService,
} from "~/services/statesService";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";

export const useStateStore = defineStore("stateStore", () => {
  const sidebarStore = useSidebarStore();
  const mainStore = useMainStore();

  // REF para armazenar as infos do Estados quando for fazer um UPDATE
  const idDeleteOrUpdate = ref(0);
  const name = ref("");
  const country = ref("");
  const country_id = ref()

  const states = ref<ListStates | null>(null);
  const toast = useToast();
  const isLoading = ref(true);

  async function getAllStates() {
    isLoading.value = true;
    try {
      const response = await getAllStatesService();
      if (response.success) {
        states.value = response.data.data;
      } else {
        toast.error("Problemas em carregar lista de Estados!");
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast.error("Erro ao obter a lista de Estados");
  
      // Tratamento de erro de conexão à internet desconectada
      if (error instanceof Error && error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("Você está desconectado da internet. Verifique sua conexão e tente novamente.");
      } else {
        // Exemplo de tratamento de erro de validação
        toast.error("Ocorreu um erro ao obter a lista de países. Tente novamente mais tarde.");
      }
  
      return { error };
    } finally {
      isLoading.value = false;
    }
  }
  

  async function saveStates(name: string, country_id: number | null) {
    //console.log("Saving state:", name, country_id);
    isLoading.value = true;
    try {
      if (!name || !country_id) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      const response = await saveStatesService(name, country_id );
      if (response.success) {
        getAllStates(); // Chama o getAllCountry para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        toast.success("País cadastrado com sucesso!");
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
        name, country_id
      );
      if (response.success) {
        getAllStates(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        name = "",
        country_id = 0,
        idDeleteOrUpdate.value = 0;
        toast.success("Banco atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    }  catch (error) {
      toast.error("Erro ao atualizar país. Por favor, tente novamente.");
    }
  }

  async function deleteStates() {
    isLoading.value = true;
    try {
      // Verifica se o ID a ser deletado é válido
      if (!idDeleteOrUpdate.value || idDeleteOrUpdate.value <= 0) {
        toast.error("ID de país inválido.");
        isLoading.value = false;
        return;
      }

      const response = await deleteStatesService(idDeleteOrUpdate.value);
      if (response.success) {
        getAllStates(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        mainStore.openDeleteModal = false;
        name.value = "",
        country.value  = "",
        idDeleteOrUpdate.value = 0;
        toast.success("País deletado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {
      toast.error("Erro ao deletar o país. Por favor, tente novamente.");
    }
  }
  
  return {
    states,
    idDeleteOrUpdate,
    isLoading,
    getAllStates,
    saveStates,
    deleteStates,
    updateStates,
    name,
    country_id, 
  };
});
