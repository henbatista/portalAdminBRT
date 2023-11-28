<script setup>
import { ref, watch } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import axios from 'axios';
import { useToast } from "vue-toastification";

import useApiUrl from '@/composables/useApiUrl';
import { updateCountry } from '~/services/countryService';
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();
const toast = useToast();

const countries = ref([{ name: 'Afeganistão', id: 1 }]);

const getAllCountries = async () => {
    try {
        // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
        const { data } = await axios.get(`${apiUrl}/api/v1/countries/pluck`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log(data)
       countries.value = data
    } catch (error) {
        toast.error('API do CEP fora do ar, entre em contato com a BRT!');
    }
  
};

// FUnção para pegar todos os bancos cadastrados
getAllCountries();

let selected = ref(null);
let query = ref('');
let country_id = ref(null);


let filteredCountries = computed(() =>
  query.value === ''
    ? countries.value
    : countries.value.filter((country) =>
    country.name.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
);

const props = defineProps({
  countryId: {
    type: Number,
    required: true,
  },
  updateCountryId: {
    type: Function,
  },
});


watch(selected, (newVal) => {
  // Atualiza country_id quando uma opção é selecionada
  country_id.value = newVal ? newVal.id : null;
 //  console.log("Updated country_id:", country_id.value);
  props.updateCountryId(newVal.name, newVal.id)
});

</script>

<template>
  <div class="w-full">
    <Combobox v-model="selected">
        <span>País</span>

      <div class="relative mt-2">
        <div
          class="relative  w-full   h-[48px] bg-transparent  transition duration-300  border-slate-200  focus:ring-slate-600  focus:ring-opacity-90  cursor-default overflow-hidden rounded bg-white text-left focus:outline-none border "
        >
          <ComboboxInput
            class="w-full border-none py-3.5 pl-3 pr-10 text-sm leading-5 ali focus:ring-0"
            :displayValue="(country) => country && country.name"
            placeholder="Digite o País"
            @change="query = $event.target.value"
          />
          <ComboboxButton class="absolute  inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute mt-1 max-h-40  w-full overflow-auto rounded-md bg-white py-1 text-sm border border-gray-300 ring-0 focus:outline-none shadow-lg"
          >
            <div
              v-if="filteredCountries.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nenhum Estado encontrado!
            </div>
             <ComboboxOption
              v-for="country in filteredCountries"
              as="template"
              :key="country.id"
              :value="country"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default  select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-slate-900 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ country.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-blue-800': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
