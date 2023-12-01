import { defineStore } from "pinia";
import type { ListExchangeRates } from "~/types/exchanges";
import {
  getAllExchanges as getAllExchangesService,
  saveExchanges as saveExchangeService,
} from "~/services/exchangeService";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";

export const useExchangesStore = defineStore("exchangesStore", () => {
  const sidebarStore = useSidebarStore();
  const exchanges = ref<ListExchangeRates | null>(null);
  const toast = useToast();
  const isLoading = ref(true);
  const openDeleteModal = ref(true);

  async function getAllExchanges() {
    try {
      const response = await getAllExchangesService();
      if (response.success) {
        exchanges.value = response.data.data;
     
      } else {
        toast.error("Usuário/Senha inválidos!");
      }
    } catch (error) {
      return { error };
    } finally {
      isLoading.value = false;
    }
  }

  async function saveExchanges(usd: string, eur: string, gbp: string) {
    isLoading.value = true;
    try {
      const response = await saveExchangeService(usd, eur, gbp);
      toast.success("Câmbios cadastrados com sucesso!");
      if (response.success) {
        getAllExchanges(); // Chama o getAllExchanges para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        toast.success("Câmbios cadastrados com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }

  return {
    exchanges,
    isLoading,
    getAllExchanges,
    saveExchanges,
    openDeleteModal,
  };
});
