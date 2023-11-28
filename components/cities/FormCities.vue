<script setup lang="ts">
import { useCityStore } from "~/stores/CityStore";
import { useSidebarStore } from "~/stores/SidebarStore";
import { ref } from 'vue';
import  type  { StateComplete  } from "~/types/stateComplete";
import  type  { CityComplete  } from "~/types/cityComplete";
import { useToast } from "vue-toastification";

const cityStore = useCityStore();
const sidebarStore = useSidebarStore();
const toast = useToast();


const country = ref<StateComplete>({
    name: "",
    country_id: 0
});

const state = ref<CityComplete>({
    name: "",
    state_id: 0
});

function handleCity() {
  const { country_id } = country.value;
  const { state_id } = state.value;

  if (cityStore.idDeleteOrUpdate === 0) {
    if (country_id !== 0 && state_id !== 0) {
      cityStore.saveCity(cityStore.name, country_id, state_id, cityStore.destination_type);
    } else {
      toast.error("Por favor, preencha os campos de país e estado antes de salvar.");
    }
  } else {
    if (country_id !== 0 && state_id !== 0) {
      cityStore.updateCity(cityStore.name, country_id, state_id, cityStore.destination_type);
    } else {
      toast.error("Por favor, preencha os campos de país e estado antes de atualizar.");
    }
  }
}

const destinations = ref([
  {
    value: "n",
    label: "Nacional",
  },
  {
    value: "i",
    label: "Internacional",
  },  

]);

const selectedDestinationType = ref("");

const updateCountryId = (CountryName: string, newCountryId: any) => {
    //console.log("Updating country_id:", newCountryId);
    country.value.country_id = newCountryId;
    country.value.name = CountryName;
};

const updateStateId = (StateName: string, newStateId: any) => {
    //console.log("Updating state_id:", newStateId);
    state.value.state_id = newStateId;
    state.value.name = StateName;
};

</script>

<template>
  <div class="bg-slate-50 justify-center  -mx-6 px-6 py-6">
    <div class="flex justify-between  mb-2">
      <div class="ml-6 grid lg:grid-cols-1 grid-cols-1">
        <span
        class="text-2xl font-bold flex gap-2 items-center"
        v-if="cityStore.idDeleteOrUpdate === 0"
      >
        Adicionar Cidade</span
      >
      <span class="text-2xl font-bold flex gap-2 items-center" v-else>
        Atualizar Cidade</span
      >
        <div class="flex-1 md:text-base text-xs"> 
          Preencha os dados para cadastrar um novo Estado.
        </div>
      </div>
      <button @click="sidebarStore.sideBarAction = false">
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

  <section class="flex mt-4 flex-col p-6 gap-4">
    <div class="flex flex-col">
      <label for="stateName" class="mt-2 mb-2"
        >Nome da Cidade</label
      >
      <input
        type="text"
        id="stateName"
        placeholder="Digite o nome da cidade"
        v-model="cityStore.name"
        class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300 mb-3"
      />
    </div>
    
    <AutoCompleteCountry :countryId="country.country_id" :updateCountryId="updateCountryId" />
    <AutoCompleteState :stateId="state.state_id" :updateStateId="updateStateId" />


    <div class="flex flex-col">
      <label for="destinationType" class="mt-2 mb-2">Tipo de Destino</label>
      <select
      id="destinationType"
      v-model="cityStore.destination_type"
      class="h-12.5 p-4 rounded-md border border-gray-200 text-sm mb-3"
    >
      <option value="" disabled selected>Selecione o tipo de destino</option>
      <option v-for="destination in destinations" :value="destination.value">{{ destination.label }}</option>
    </select>
    </div>

    <button
      @click="handleCity"
      :class="!cityStore.isLoading ? '' : 'opacity-50'"
      class="inline-flex mt-5 transition-all  duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950  bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
    >
      <div v-if="!cityStore.isLoading" class="flex justify-center items-center">
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
        <span v-if="cityStore.idDeleteOrUpdate === 0">ADICIONAR CIDADE</span
        ><span v-else>ATUALIZAR CIDADE</span>
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
  </section>
</template>

<style scoped></style>
~/types/ctyComplete