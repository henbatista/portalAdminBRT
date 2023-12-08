import { defineStore } from "pinia";
import { ref } from "vue";
import type { ListCountries } from "~/types/country";
import {
  getAllCountries as getAllCountryService,
  saveCountry as saveCountryService,
  deleteCountry as deleteCountryService,
  updateCountry as updateCountryService,
} from "~/services/countryService";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";

export const useCountryStore = defineStore("countryStore", () => {
  const sidebarStore = useSidebarStore();
  const mainStore = useMainStore();

  

  // REF para armazenar as infos do país quando for fazer um UPDATE
  const idDeleteOrUpdate = ref(0);
  const name = ref("");
  const formal_name = ref("");
  const phone_code = ref(0);
  const iso = ref("");
  const iso3 = ref("");


  const countries = ref<ListCountries | null>(null);
  const toast = useToast();
  const isLoading = ref(true);

  async function getAllCountries() {
    isLoading.value = true;
    try {
      const response = await getAllCountryService();
      if (response.success) {
        countries.value = response.data.data;
      } else {
        toast.error("Problemas em carregar lista de Países!");
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast.error("Erro ao obter a lista de países:");
  
      // Tratamento de erro de conexão à internet desconectada
      if (error instanceof Error && error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("Erro de conexão à internet desconectada:");
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
  

  async function saveCountry(name: string, formal_name: string, phone_code: number, iso: string, iso3: string) {
    isLoading.value = true;
    try {
      const response = await saveCountryService(name, formal_name, phone_code, iso, iso3);
      if (response.success) {
        getAllCountries(); // Chama o getAllCountry para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        toast.success("País cadastrado com sucesso!");
      } else {
        toast.error("Preencha todos os campos obrigatórios");
        isLoading.value = false;
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast.error("Erro ao salvar o país:");
  
      // Tratamento de erro de conexão à internet desconectada
      if (error instanceof Error && error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        toast.error("Erro de conexão à internet desconectada:");
        toast.error("Você está desconectado da internet. Verifique sua conexão e tente novamente.");
      } else {
        // tratamento de erro de rede
        if (error instanceof Error && error.message.includes("NetworkError")) {
        toast.error("Erro de rede");
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

  
  async function updateCountry() {
    try {
      if (!name.value || !formal_name.value || !phone_code.value || !iso.value || !iso3.value) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
      }
  
      const response = await updateCountryService(
        idDeleteOrUpdate.value,
        name.value,
        formal_name.value,
        phone_code.value,
        iso.value,
        iso3.value
      );
      if (response.success) {
        getAllCountries(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        name.value = "",
        formal_name.value  = "",
        phone_code.value  = 0,
        iso.value  = "",
        iso3.value  = "",
        idDeleteOrUpdate.value = 0;
        toast.success("País atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    }  catch (error) {
      toast.error("Erro ao atualizar país. Por favor, tente novamente.");
    }
  }

  async function deleteCountry() {
    isLoading.value = true;
    try {
      // Verifica se o ID a ser deletado é válido
      if (!idDeleteOrUpdate.value || idDeleteOrUpdate.value <= 0) {
        toast.error("ID de país inválido.");
        isLoading.value = false;
        return;
      }

      const response = await deleteCountryService(idDeleteOrUpdate.value);
      if (response.success) {
        getAllCountries(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        mainStore.openDeleteModal = false;
        name.value = "",
        formal_name.value  = "",
        phone_code.value  = 0,
        iso.value  = "",
        iso3.value  = "",
        name.value = "";
        idDeleteOrUpdate.value = 0;
        toast.success("País deletado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {
      toast.error("Erro ao deletar país. Por favor, tente novamente.");
    }
  }
  
  return {
    countries,
    idDeleteOrUpdate,
    isLoading,
    getAllCountries,
    saveCountry,
    deleteCountry,
    updateCountry,
    name,
    formal_name,
    phone_code,
    iso,
    iso3
  };
});
