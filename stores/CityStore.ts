import { defineStore } from "pinia";
import { ref } from "vue";
import type { ListCities } from "~/types/cities";
import {
  getAllCities as getAllCitiesService,
  saveCity as saveCitiesService,
  deleteCity as deleteCitiesService,
  updateCity as updateCitiesService,
} from "~/services/cityService";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";

export const useCityStore = defineStore("cityStore", () => {
  const sidebarStore = useSidebarStore();
  const mainStore = useMainStore();

  // REF para armazenar as infos do banco quando for fazer um UPDATE
  const idDeleteOrUpdate = ref(0);
  const name = ref("");
  const state_id = ref("");
  const city = ref("")
  const country_id = ref("");
  const destination_type = ref("");
  

  const cities = ref<ListCities | null>(null);
  const toast = useToast();
  const isLoading = ref(true);

  async function getAllCities() {
    try {
      const response = await getAllCitiesService();
      if (response.success) {
        cities.value = response.data.data;
      } else {
        toast.error("Problemas em carregar lista de bancos!");
      }
    } catch (error) {
      return { error };
    } finally {
      isLoading.value = false;
    }
  }


  async function saveCity(name: string, country_id: number | null, state_id: number , destination_type: string) {
    // console.log("Saving state:", name, country_id, state_id, destination_type );
    isLoading.value = true;
    try {
      if (!name || !country_id || !state_id || !destination_type) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
      const response = await saveCitiesService(name, country_id, state_id, destination_type );
      if (response.success) {
        getAllCities(); // Chama o getAllCountry para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        toast.success("Cidade cadastrada com sucesso!");
      } else {
        toast.error("Preencha todos os campos obrigatórios");
       // console.log( name, country_id, state_id, destination_type)
        isLoading.value = false;
      }
    } catch (error) { 
      // Tratamento de erro genérico
     // console.error("Erro ao salvar o cidade:", error);
  
      // Tratamento de erro de conexão à internet desconectada
      if (error instanceof Error && error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("Erro de conexão à internet desconectada:");
        toast.error("Você está desconectado da internet. Verifique sua conexão e tente novamente.");
      } else {
        // tratamento de erro de rede
        if (error instanceof Error && error.message.includes("NetworkError")) {
          toast.error("Erro de rede:");
          toast.error("Erro de rede ao salvar o país. Verifique sua conexão e tente novamente.");
        } else if (error instanceof Error && error.message.includes("ValidationError")) {
          // tratamento de erro de validação
          toast.error("Erro de validação");
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

  
  async function updateCity(name: string, country_id: number, state_id: number, destination_type: string ) {
    try {
      if (!name || !country_id || !state_id || !destination_type ) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      const response = await updateCitiesService(
        idDeleteOrUpdate.value,
        name, country_id, state_id, destination_type
      );
      if (response.success) {
        getAllCities(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        name = "",
        country_id = 0,
        state_id = 0,
        destination_type = ""
        idDeleteOrUpdate.value = 0;
        toast.success("Ciodade atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    }  catch (error) {
      toast.error("Erro ao atualizar país:");
      toast.error("Erro ao atualizar país. Por favor, tente novamente.");
    }
  }
  
  async function deleteCity() {
    isLoading.value = true;
    try {
      // Verifica se o ID a ser deletado é válido
      if (!idDeleteOrUpdate.value || idDeleteOrUpdate.value <= 0) {
        toast.error("ID de Cidade inválido.");
        isLoading.value = false;
        return;
      }

      const response = await deleteCitiesService(idDeleteOrUpdate.value);
      if (response.success) {
        getAllCities(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        mainStore.openDeleteModal = false;
        name.value = "",
        city.value  = "",
        idDeleteOrUpdate.value = 0;
        toast.success("Cidade deletada com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {

      toast.error("Erro ao deletar a cidade. Por favor, tente novamente.");
    }
  }

  



  return {
    cities,
    idDeleteOrUpdate,
    isLoading,
    getAllCities,
    saveCity,
    updateCity,
    deleteCity,
    name,
    state_id,
    country_id,
    destination_type,
  };
});
