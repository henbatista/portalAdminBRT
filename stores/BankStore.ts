import { defineStore } from "pinia";
import { ref } from "vue";
import type { ListBanks } from "~/types/banks";
import {
  getAllBanks as getAllBanksService,
  saveBank as saveBankService,
  deleteBank as deleteBankService,
  updateBank as updateBankService,
} from "~/services/bankService";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";

export const useBankStore = defineStore("bankStore", () => {
  const sidebarStore = useSidebarStore();
  const mainStore = useMainStore();

  // REF para armazenar as infos do banco quando for fazer um UPDATE
  const bankNumber = ref("");
  const name = ref("");
  const idDeleteOrUpdate = ref(0);

  const banks = ref<ListBanks | null>(null);
  const toast = useToast();
  const isLoading = ref(true);

  async function getAllBanks() {
    try {
      const response = await getAllBanksService();
      if (response.success) {
        banks.value = response.data.data;
      } else {
        toast.error("Problemas em carregar lista de bancos!");
      }
    } catch (error) {
      return { error };
    } finally {
      isLoading.value = false;
    }
  }

  async function saveBank(bankNumber: string, name: string) {
    isLoading.value = true;
    try {
      const response = await saveBankService(bankNumber, name);
      if (response.success) {
        getAllBanks(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        toast.success("Banco cadastrados com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }

  async function updateBank() {
    try {
      const response = await updateBankService(
        idDeleteOrUpdate.value,
        bankNumber.value,
        name.value
      );
      if (response.success) {
        getAllBanks(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        bankNumber.value = "";
        name.value = "";
        idDeleteOrUpdate.value = 0;
        toast.success("Banco atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }

  async function deleteBank() {
    isLoading.value = true;
    try {
      const response = await deleteBankService(idDeleteOrUpdate.value);
      if (response.success) {
        getAllBanks(); // Chama o getAllbanks para atualizar a tabela!
        sidebarStore.sideBarAction = false;
        mainStore.openDeleteModal = false;
        bankNumber.value = "";
        name.value = "";
        idDeleteOrUpdate.value = 0;
        toast.success("Banco deletado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {}
  }

  return {
    banks,
    idDeleteOrUpdate,
    isLoading,
    getAllBanks,
    saveBank,
    deleteBank,
    bankNumber,
    name,
    updateBank,
  };
});
