<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import _ from "lodash"; // Usando Lodash para debounce
import useApiUrl from "@/composables/useApiUrl";
import { Icon } from "@iconify/vue";
import { useRecommendedHotelStore } from "~/stores/RecommendedHotelStore";

const recommendedHotelStore = useRecommendedHotelStore();

//Icons
const hotelIdIcon = "icon-park-outline:hotel-please-clean";
const icons = {
  hotelIdIcon,
};

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

const searchTerm = ref("");
const searchResults = ref([]);

// Função de busca debounced
const debouncedSearch = _.debounce(async () => {
  if (searchTerm.value.trim() === "") {
    searchResults.value = [];
    return;
  }
  try {
    const response = await axios.post(
      `${apiUrl}/api/v1/getHotelsElastic?page=1&perPage=6000`,
      {
        hotelName: searchTerm.value,
      },
    );
    searchResults.value = response.data.data.data; // Ajuste conforme a estrutura da sua resposta
  } catch (error) {
    console.error("Erro na busca", error);
  }
}, 500); // Tempo de espera antes de disparar a busca

const selectHotel = (hotel) => {
  // Atualiza a store do Pinia com os dados completos do hotel
  recommendedHotelStore.selectedHotel = hotel;

  // Atualiza searchTerm com o nome do hotel selecionado
  searchTerm.value = hotel.name;

  // Emite o evento para atualizar o valor no componente pai
  emit("update:modelValue", hotel.name);

  // Limpa os resultados da busca
  searchResults.value = [];
};

watch(
  () => props.modelValue,
  (newVal) => {
    searchTerm.value = newVal; // Atualiza searchTerm quando o modelValue muda
  },
);
</script>

<template>
  <div>
    <label class="flex-0 text-sm md:w-[100px] w-[60px]">ID Hotel</label>

    <div class="flex mt-1 items-stretch">
      <span class="flex-none input-group-addon">
        <span
          class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
        >
          <Icon :icon="icons.hotelIdIcon" />
        </span>
      </span>
      <div class="flex-1">
        <div class="relative fromGroup2">
          <input
            v-model="searchTerm"
            @input="debouncedSearch"
            placeholder="Digite o nome do hotel"
            label="Digite o nome do hotel"
            name="idHotel"
            type="text"
            class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
          />
        </div>
      </div>
    </div>
    <div class="relative">
      <ul
        v-if="searchResults.length"
        class="z-50 absolute w-full bg-white mt-1 p-2 border text-sm border-gray-300 rounded max-h-40 overflow-y-auto shadow-lg"
      >
        <li
          v-for="hotel in searchResults"
          :key="hotel.code"
          @click="selectHotel(hotel)"
          class="px-2 py-1 hover:bg-slate-900 hover:text-white cursor-pointer"
        >
          {{ hotel.name }} ({{ hotel.provider }})
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
