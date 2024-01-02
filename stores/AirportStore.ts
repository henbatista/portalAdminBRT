import { defineStore } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useSidebarStore } from "~/stores/SidebarStore";
import { useMainStore } from "~/stores/MainStore";
import type { IListAirports } from "~/types/airports";
import axios from "axios";
import useApiUrl from "~/composables/useApiUrl";
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

export const useAirportStore = defineStore("airportStore", () => {
  const sidebarStore = useSidebarStore();
  const mainStore = useMainStore();

  // REF para armazenar as infos do banco quando for fazer um UPDATE
  const idDeleteOrUpdate = ref(0);
  const airports = ref<IListAirports | null>(null);
  const name = ref("");
  const iata = ref("");
  const lat = ref("");
  const long = ref("");
  const country = ref("");


  const airportToUpdateCities = ref("");
  const citiesSelectedToAirport = ref([]);

  const toast = useToast();
  const isLoading = ref(true);

  async function getAllAirports() {
    try {
      // Pegar o token do localStorage
      const authLocalStore = JSON.parse(
        localStorage.getItem("authStore") || "{}",
      );
      const token = authLocalStore.token;
      const { data } = await axios.get(`${apiUrl}/api/v1/airports`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        airports.value = data.data;
      } else {
        toast.error("Problemas em carregar lista de aeroportos!");
      }
    } catch (error) {
      toast.error("Problemas em carregar lista de aeroportos!");
    } finally {
      isLoading.value = false;
    }
  }

  async function saveCitiesInAirport() {
    try {
      // Pegar o token do localStorage
      const authLocalStore = JSON.parse(
        localStorage.getItem("authStore") || "{}",
      );
      const token = authLocalStore.token;
      const axiosPayload = [citiesSelectedToAirport.value];
      const { data } = await axios.post(
        `${apiUrl}/api/v1/airports/${airportToUpdateCities}/cities`,
        axiosPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data) {
        getAllAirports();
        sidebarStoreTenant.sideBarActionTenant = false;
        toast.success("Aeroporto cadastrado com sucesso!");
      }
    } catch (error) {
      toast.error("Problemas ao cadastrar o aeroporto!");
    } finally {
      isLoading.value = false;
    }
  }

  async function saveAirport() {
    try {
      // Pegar o token do localStorage
      const authLocalStore = JSON.parse(
        localStorage.getItem("authStore") || "{}",
      );
      const token = authLocalStore.token;
      const axiosPayload = {
        name: name.value,
        iata: iata.value,
        lat: lat.value,
        long: long.value,
        country: country.value
      };
      const { data } = await axios.post(
        `${apiUrl}/api/v1/airports`,
        axiosPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data) {
        airportToUpdateCities.value = data.data.id;
        saveCitiesInAirport();
      }
    } catch (error) {
      toast.error("Problemas ao cadastrar o aeroporto!");
    } finally {
      isLoading.value = false;
    }
  }

  async function updateAirport() {}

  async function deleteAirport() {
    try {
      // Obtém o token do localStorage
      const authLocalStore = JSON.parse(
        localStorage.getItem("authStore") || "{}",
      );
      const token = authLocalStore.token;

      // Faz uma requisição DELETE para a API de estados, incluindo o token de autorização nos cabeçalhos
      const { data } = await axios.delete(
        `${apiUrl}/api/v1/airports/${idDeleteOrUpdate.value}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Pegar os aeroportos novamente após exclusão
      getAllAirports();
      toast.success("Aeroporto excluído com sucesso!");
      mainStore.openDeleteModal = false;
    } catch (error) {
      toast.error("Problemas ao excluir o aeroporto!");
    }
  }

  return {
    airports,
    idDeleteOrUpdate,
    isLoading,
    getAllAirports,
    saveAirport,
    updateAirport,
    deleteAirport,
    name,
    iata,
    lat,
    long,
    country,
    citiesSelectedToAirport,
  };
});
