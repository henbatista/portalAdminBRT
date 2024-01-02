<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { useAirportStore } from "~/stores/AirportStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue";
import type { ICity } from "../../types/airports"
import { ref, onMounted } from "vue";
import axios from "axios";

const airportIcon = "mdi:airport";
const airportNameIcon = "streamline:airport-plane";
const iataIcon = "simple-icons:iata";
const latIcon = "mdi:latitude"
const logIcon = "mdi:longitude"

const icons = {
  airportIcon,
  airportNameIcon,
  iataIcon,
  latIcon,
  logIcon
};

const airportStore = useAirportStore();
const sidebarStoreTenant = useSidebarStoreTenant();
const toast = useToast();

interface Airport {
  icao: string;
  iata: string;
  name: string;
  city: string;
  state: string;
  country: string;
  elevation: number;
  lat: string;
  lon: string;
  tz: string;
}

const airports = ref<Record<string, Airport>>({});
const searchQuery = ref("");
const filteredAirports = ref<Airport[]>([]);
const isLoading = ref(false);

// Carrega os dados dos aeroportos
const loadAirports = async () => {
  try {
    const { data } = await axios.get("https://raw.githubusercontent.com/mwgg/Airports/master/airports.json");
    airports.value = data;
  } catch (error) {
    console.error("Erro ao carregar dados dos aeroportos:", error);
  }
};

onMounted(loadAirports);



// Filtra os aeroportos com base na consulta de pesquisa
const filterAirports = (query: string) => {
  if (!query || query.length < 3) {
    filteredAirports.value = [];
    return;
  }
  isLoading.value = true;
  filteredAirports.value = Object.values(airports.value).filter(airport =>
    airport.name.toLowerCase().includes(query.toLowerCase())
  );
  isLoading.value = false;
};

watch(searchQuery, (newValue) => {
  filterAirports(newValue);
});




// Armazenar os dados do país escolhido no Autocomplete
const cityType = ref<ICity>({
  id: 0,
  name: "",
  state: "",
  state_id: 0,
  country: "",
  country_id: 0,
  destination_type: "",
});

const updateCountryId = (countryName: string, newCountryId: any) => {
  cityType.value.country_id = newCountryId;
  cityType.value.country = countryName;
};

const updateStateId = (stateName: string, newStateId: any) => {
  cityType.value.state_id = newStateId;
  cityType.value.state = stateName;
};
const updateTenantIdComission = (TenantName: string, newTenantId: any) => {
  cityType.value.name = newTenantId;
};

const updateInput = async (selectedAirport: Airport) => {
  searchQuery.value = selectedAirport.name;
  selectAirport(selectedAirport);
  await nextTick();
  filteredAirports.value = []; // Limpa a lista após a atualização do DOM
};

const formIsValid = computed(() => allFieldsCompleted());

// Método para selecionar um aeroporto e preencher o formulário
const selectAirport = (airport: Airport) => {
  airportStore.name = airport.name;
  airportStore.iata = airport.iata;
  airportStore.lat = airport.lat;
  airportStore.long = airport.lon;
  // Se necessário, atualize outros campos relacionados ao aeroporto selecionado
};

function allFieldsCompleted() {
  const fields = [
    airportStore.name,
    airportStore.iata,
    airportStore.lat,
    airportStore.long,
  ];
  return fields.every((field) => field !== "");
}

function handleAirport() {
  airportStore.saveAirport();
}

</script>

<template>
  <div class="bg-slate-50 justify-end -mx-6 px-6 py-6">
    <div class="flex justify-between mb-2">
      <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-if="airportStore.idDeleteOrUpdate === 0"
        >
          <Icon class="-mt-0.5" :icon="icons.airportIcon" />
          Adicionar Aeroporto</span
        >
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-else
        >
          <Icon class="-mt-0.5" :icon="icons.airportIcon" />
          Atualizar Aeroporto</span
        >
        <div class="flex-1 md:text-base text-xs">
          Preencha os dados para cadastrar um novo Aeroporto.
        </div>
      </div>
      <button @click="sidebarStoreTenant.sideBarActionTenant = false">
        <svg
          class="mr-7"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
          />
        </svg>
      </button>
    </div>
  </div>

  <section class="grid lg:grid-cols-2 grid-cols-1 gap-5 p-6">

    
    <!-- Nome do Aeroporto -->

    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px] ">Aeroporto</label>
      <div class="flex items-stretch mt-1">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.airportNameIcon" />
          </span> 
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
            type="text"
            id="airport"
            v-model="searchQuery"
            autocomplete="off"
            placeholder="Digite o nome do Aeroporto"
            class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
          />
          <div
          v-if="filteredAirports.length"
          class="w-full bg-white mt-1 p-2 border text-sm border-gray-300 rounded max-h-40 overflow-y-auto shadow-lg"
        >
          <div
            v-for="airport in filteredAirports"
            :key="airport.icao"
            class="px-2 py-1 hover:bg-gray-200 cursor-pointer"
            @click="updateInput(airport)"
          >
            {{ airport.name }} ({{ airport.city }}, {{ airport.country }})
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>


    <!-- IATA -->
    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]">IATA</label>
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon class="w-full" :icon="icons.iataIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              v-model="airportStore.iata"
              name="iata"
              id="iataName"
              label="IATA"
              type="text"
              placeholder="Digite a sigla IATA"
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>

        <!-- Latitude -->
        <div>
          <label class="flex-0 text-sm md:w-[100px] w-[60px]">Latitude</label>
          <div class="flex mt-1 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
              >
                <Icon class="w-full" :icon="icons.latIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                  v-model="airportStore.lat"
                  name="lat"
                  id="latPosition"
                  label="Latitude"
                  type="text"
                  placeholder="Digite a Latitude"
                  class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>

        
        <!-- Latitude -->
        <div>
          <label class="flex-0 text-sm md:w-[100px] w-[60px]">Longitude</label>
          <div class="flex mt-1 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
              >
                <Icon class="w-full" :icon="icons.logIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                v-model="airportStore.long"
                name="lat"
                id="longPosition"
                label="Longitude"
                  type="text"
                  placeholder="Digite a Longitude"
                  class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>

        
    <div>
      <AutoCompleteCountry
        :countryId="cityType.country_id"
        :updateCountryId="updateCountryId"
      />
    </div>

    <div>
      <AutoCompleteState
        :stateId="cityType.state_id"
        :updateStateId="updateStateId"
      />
    </div>




  </section>



  <div class="px-60">
    <AutoCompleteCitymutiplo 
    :tenantId="airportStore.citiesSelectedToAirport"
    :updateTenantId="updateTenantIdComission"
    />
  </div>

  <div class="flex p mt-8 flex-col items-end justify-end mr-6">
    <button
      :disabled="!formIsValid"
      @click="handleAirport"
      :class="airportStore.isLoading || !formIsValid ? 'opacity-25' : ''"
      class="inline-flex mt-5 items-center justify-center rounded capitalize border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90"
    >
      <div
        v-if="!airportStore.isLoading"
        class="flex justify-center gap-5 items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5Z"
          />
        </svg>
        <span v-if="airportStore.idDeleteOrUpdate === 0"
          >ADICIONAR AEROPORTO</span
        ><span v-else>ATUALIZAR AEROPORTO</span>
      </div>
      <div v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ffffff"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            fill="#ffffff"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
      </div>
    </button>
  </div>

</template>

<style src="@vueform/multiselect/themes/default.css"></style>
