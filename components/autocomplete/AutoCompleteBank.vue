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

import useApiUrl from '@/composables/useApiUrl';
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

const banks = ref([{ name: 'Banco do Brasil S.A.', bank_number: '001', id: 2 }]);

const gelAllBanks = async () => {
  const { data, error } = await useFetch(`${apiUrl}/api/v1/banks/pluck`, {
    method: 'GET',
  });

  if (data.value && Array.isArray(data.value)) {
    banks.value = data.value.map((bank) => ({
      ...bank,
      name: `${bank.bank_number} - ${bank.name}`,
    }));
  } else if (error) {
    toast.error('API do CEP fora do ar, entre em contato com a BRT!');
  }
};

// FUnção para pegar todos os bancos cadastrados
gelAllBanks();

let selected = ref(null);
let query = ref('');

let filteredBanks = computed(() =>
  query.value === ''
    ? banks.value
    : banks.value.filter((bank) =>
        bank.name.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
);

const props = defineProps({
  bankId: {
    type: Number,
    required: true,
  },
  updateBankId: {
    type: Function,
  },
});
const emit = defineEmits();

// watch(selected, (newVal) => {
//   emit('update:bankId', newVal.id, 'Eduardo');
// });

watch(selected, (newVal) => {
  props.updateBankId(newVal.id, newVal.name);
});
</script>

<template>
  <div class="w-full">
    <Combobox v-model="selected">
      <div class="relative mt-1">
        <div
        class="block w-full rounded-sm b  g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0  focus:outline-none  
        text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600 "
        >
          <ComboboxInput
            class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0"
            :displayValue="(bank) => bank && bank.name"
            placeholder="Digite seu banco..."
            @change="query = $event.target.value"
          />
          <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
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
            class="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm border border-gray-300 ring-0 focus:outline-none shadow-lg"
          >
            <div
              v-if="filteredBanks.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nenhum banco encontrado!
            </div>
            <!-- <div>
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900"
              >
                Escolha seu banco
              </li>
            </div> -->
            <ComboboxOption
              v-for="bank in filteredBanks"
              as="template"
              :key="bank.id"
              :value="bank"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-slate-900 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                  {{ bank.name }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-slate-900': !active }"
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
