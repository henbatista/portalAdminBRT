import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";
import type {
  ListRecommendedHotel,
  HotelRecommended,
  HotelSelected,
} from "~/types/recommendedHotels";
import {
  saveRecommendedHotel as saveRecommendedHotelService,
  deleteRecommendedHotel as deleteRecommendedHotelService,
  updateRecommendedHotel as updateRecommendedHotelService,
} from "~/services/recommendedHotelService";
import axios from "axios";
import useApiUrl from "~/composables/useApiUrl";

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

const hotelRecommendedToUpdate = ref<HotelRecommended | null>(null);

export const useRecommendedHotelStore = defineStore(
  "recommendedHotelStore",
  () => {
    // Inicializa variáveis de estado e serviços
    const sidebarStore = useSidebarStore();
    const mainStore = useMainStore();

    // REF para armazenar as infos do banco quando for fazer um UPDATE
    const idDeleteOrUpdate = ref(0); // Inicialize com uma string vazia ou com o valor inicial desejado

    const citiesSelectedToAirport = ref([]);

    const selectedHotel = ref<HotelSelected | null>(null);

    const hotels = ref<ListRecommendedHotel | null>(null);
    const toast = useToast();
    const isLoading = ref(true);
    const idHotel = ref("");

    // Busca todos os Usuários na API

    async function getAllRecommendedHotel(
      search = "",
      page = 1,
      per_page = 100,
    ) {
      try {
        // Pegar o token do localStorage
        const authLocalStore = JSON.parse(
          localStorage.getItem("authStore") || "{}",
        );
        const token = authLocalStore.token;
        // Faz uma requisição GET para a API de Hotéis Recomendados, incluindo o token de autorização nos cabeçalhos
        const { data } = await axios.get(
          `${apiUrl}/api/v1/hoteisrecomendados/listar`,
          {
            params: {
              search,
              page,
              per_page,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (data) {
          hotels.value = data.data.data;
        } else {
          toast.error("Problemas em carregar lista de aeroportos!");
        }
      } catch (error) {
        toast.error("Problemas em carregar lista de aeroportos!");
      } finally {
        isLoading.value = false;
      }
    }

    // Salva um novo Markup na API
    async function saveRecommendedHotel(hotelRecommended: HotelRecommended) {
      isLoading.value = true;
      try {
        const response = await saveRecommendedHotelService(hotelRecommended);
        if (response.success) {
          getAllRecommendedHotel(); // Chama o getAllMarkup para atualizar a tabela!
          sidebarStore.sideBarAction = false;
          toast.success("Hotel Recomendado cadastrado com sucesso!");
        } else {
          toast.error("Preencha todos os campos obrigatórios");
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
          if (
            error instanceof Error &&
            error.message.includes("NetworkError")
          ) {
            toast.error(
              "Erro de rede ao salvar o markup. Verifique sua conexão e tente novamente.",
            );
          } else if (
            error instanceof Error &&
            error.message.includes("ValidationError")
          ) {
            // Tratamento de erro de validação
            toast.error(
              "Erro de validação ao salvar o hotel recomendado. Verifique os dados inseridos.",
            );
          } else {
            // Tratamento de outros erros
            toast.error(
              "Ocorreu um erro ao salvar o hotel recomendado. Tente novamente mais tarde.",
            );
          }
        }
      } finally {
        isLoading.value = false;
      }
    }

    // Atualiza um Hotel Recomendado existente na API
    async function updateRecommendedHotel(hotelRecommended: HotelRecommended) {
      try {
        const response = await updateRecommendedHotelService(hotelRecommended);
        idDeleteOrUpdate.value;
        if (response.success) {
          getAllRecommendedHotel(); // Chama o getAllRecommendedHotel para atualizar a tabela!
          sidebarStore.sideBarAction = false;
          idDeleteOrUpdate.value = 0;
          toast.success("Hotel Recomendado atualizado com sucesso!");
        } else {
          toast.error("Problemas com API!");
          isLoading.value = false;
        }
      } catch (error) {
        toast.error(
          "Erro ao atualizar o Hotel Recomendado. Por favor, tente novamente.",
        );
      }
    }

    async function deleteRecommendedHotel() {
      try {
        // Verifica se o ID a ser deletado é válido
        const response = await deleteRecommendedHotelService(
          idDeleteOrUpdate.value,
        );
        if (response.success) {
          getAllRecommendedHotel();
          sidebarStore.sideBarAction = false;
          mainStore.openDeleteModal = false;
          (idHotel.value = ""), (idDeleteOrUpdate.value = 0);
          toast.success("Hotel Recomendado deletado com sucesso!");
          // Encontre o elemento com a chave correspondente (item_id) e remova-o do DOM
        } else {
          toast.error("Problemas com API!");
          isLoading.value = false;
        }
      } catch (error) {
        toast.error(
          "Erro ao deletar o Hotel Recomendado. Por favor, tente novamente.",
        );
      }
    }

    return {
      hotels,
      idDeleteOrUpdate,
      isLoading,
      getAllRecommendedHotel,
      saveRecommendedHotel,
      selectedHotel,
      updateRecommendedHotel,
      deleteRecommendedHotel,
      citiesSelectedToAirport,
      hotelRecommendedToUpdate,
    };
  },
);
