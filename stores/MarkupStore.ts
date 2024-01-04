// Importa as funções e módulos necessários do Vue e do arquivo de serviço
import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAllMarkup as getAllMarkupService,
  saveMarkup as saveMarkupService,
  deleteMarkup as deleteMarkupService,
  updateMarkup as updateMarkupService,
} from "~/services/markupService";
import { useToast } from "vue-toastification";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useMainStore } from "~/stores/MainStore";
import {
  type Markup,
  type ListMarkups,
  type Commission,
} from "../types/markup"; // Altere o caminho conforme a estrutura do seu projeto

// Define o store usando o Pinia
export const useMarkupStore = defineStore("markupStore", () => {
  // Inicializa variáveis de estado e serviços
  const sidebarStoreTenant = useSidebarStoreTenant();
  const mainStore = useMainStore();

  // REF para armazenar as infos do Markup quando for fazer um UPDATE
  const idDeleteOrUpdate = ref(""); // Inicialize com uma string vazia ou com o valor inicial desejado
  const markup_id = ref("");
  const markup_priority = ref(0);
  const markup_type = ref(0);
  const markup_tenants = ref("");
  const markup_applied = ref(0);
  const markup_received = ref("");
  const markup_title = ref("");
  const markup_is_active = ref("");
  const created_at = ref("");
  const updated_at = ref("");

  const markups = ref<ListMarkups | null>(null);
  const commissions = ref<Commission | null>(null);
  const markupToUpdate = ref<Markup | null>(null);

  const toast = useToast();
  const isLoading = ref(true);

  // Busca todos os Markups na API
  async function getAllMarkup() {
    isLoading.value = true;
    try {
      //console.log("Fetching markup...");
      const response = await getAllMarkupService();
      //console.log("Response from service:", response);
      if (response.success) {
        markups.value = response.data.data;
        commissions.value = response.data.data;
      } else {
        toast.error("Problemas em carregar lista de markup!");
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast.error("Erro ao obter a lista de markup");
      // Tratamento de erro de conexão à internet desconectada
      if (
        error instanceof Error &&
        error.message.includes("ERR_INTERNET_DISCONNECTED")
      ) {
        toast.error(
          "Você está desconectado da internet. Verifique sua conexão e tente novamente.",
        );
      } else {
        // tratamento de erro de validação
        toast.error(
          "Ocorreu um erro ao obter a lista de markup. Tente novamente mais tarde.",
        );
      }
      return { error };
    } finally {
      isLoading.value = false;
    }
  }

  // Salva um novo Markup na API
  async function saveMarkup(markup: Markup) {
    isLoading.value = true;
    try {
      const response = await saveMarkupService(markup);
      if (response.success) {
        getAllMarkup(); // Chama o getAllMarkup para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        toast.success("Markup cadastrado com sucesso!");
      } else {
        toast.error("Preencha todos os campos obrigatórios");
        // console.log(name, country_id)
        isLoading.value = false;
      }
    } catch (error) {
      // Tratamento de erro genérico
      toast.error("Erro ao salvar o markup");

      // Tratamento de erro de conexão à internet desconectada
      if (
        error instanceof Error &&
        error.message.includes("ERR_INTERNET_DISCONNECTED")
      ) {
        toast.error(
          "Você está desconectado da internet. Verifique sua conexão e tente novamente.",
        );
      } else {
        // Tratamento de erro de rede
        if (error instanceof Error && error.message.includes("NetworkError")) {
          toast.error(
            "Erro de rede ao salvar o markup. Verifique sua conexão e tente novamente.",
          );
        } else if (
          error instanceof Error &&
          error.message.includes("ValidationError")
        ) {
          // Tratamento de erro de validação
          toast.error(
            "Erro de validação ao salvar o markup. Verifique os dados inseridos.",
          );
        } else {
          // Tratamento de outros erros
          toast.error(
            "Ocorreu um erro ao salvar o markup. Tente novamente mais tarde.",
          );
        }
      }
    } finally {
      isLoading.value = false;
    }
  }

  // Atualiza um Markup existente na API
  async function updateMarkup(markup: Markup) {
    try {
      const response = await updateMarkupService(markup);
      idDeleteOrUpdate.value;
      if (response.success) {
        getAllMarkup(); // Chama o getAllMarkup para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        idDeleteOrUpdate.value = "";
        toast.success("Markup atualizado com sucesso!");
      } else {
        toast.error("Problemas com API!");
        isLoading.value = false;
      }
    } catch (error) {
      toast.error("Erro ao atualizar o Estado. Por favor, tente novamente.");
    }
  }

  async function deleteMarkup() {
    try {
      // Verifica se o ID a ser deletado é válido
      const response = await deleteMarkupService(idDeleteOrUpdate.value);
      if (response.success) {
        sidebarStoreTenant.sideBarActionTenant = false;
        mainStore.openDeleteModal = false;
        (markup_title.value = ""), (idDeleteOrUpdate.value = "");
        toast.success("Markup deletado com sucesso!");
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
    getAllMarkup,
    updateMarkup,
    saveMarkup,
    deleteMarkup,
    markups,
    idDeleteOrUpdate,
    isLoading,
    markup_id,
    markup_priority,
    markup_type,
    markup_tenants,
    markup_applied,
    markup_received,
    markup_title,
    markup_is_active,
    created_at,
    updated_at,
    markupToUpdate,
  };
});
