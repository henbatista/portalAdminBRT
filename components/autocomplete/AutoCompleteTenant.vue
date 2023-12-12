<script setup>
import { ref, watch, computed, defineProps } from 'vue';
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

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();
const toast = useToast();

const tenants = ref([{ name: 'Afeganistão', id: 1 }]);
const query = ref('');

const props = defineProps(['updateTenantId']);


const getAllTenants = async () => {
  try {
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}"
    );
    const token = authLocalStore.token;
    
    const { data } = await axios.get(`${apiUrl}/api/v1/tenants/pluck?search=${query.value}&order=asc&page=1&per_page=10`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Verifique se a propriedade 'data' existe na resposta
    const newTenants = data && data.data ? data.data : [];

    tenants.value = Array.isArray(newTenants) ? newTenants : [];
    
  } catch (error) {
    toast.error('API do CEP fora do ar, entre em contato com a BRT!');
  }
};

getAllTenants();

let selected = ref(null);
let tenant_id = ref(null);

watch(selected, (newVal) => {
  tenant_id.value = newVal ? newVal.id : null;
  props.updateTenantId(newVal ? newVal.name : null, newVal ? newVal.id : null);
});

watch(query, () => {
  getAllTenants();
});

const filteredTenants = computed(() =>
  query.value === ''
    ? tenants.value
    : tenants.value.filter((tenant) =>
    tenant.name.toLowerCase().replace(/\s+/g, '').includes(query.value.toLowerCase().replace(/\s+/g, ''))
      )
);
</script>

<template>
  <div class="w-full">
    <Combobox v-model="selected">
        <span class="text-sm">Empresa</span>

      <div class="relative mt-2">
        <div
          class="relative  w-full   h-[40px] bg-transparent  transition duration-300  border-slate-200  focus:ring-slate-600  focus:ring-opacity-90  cursor-default overflow-hidden rounded bg-white text-left focus:outline-none border "
        >
          <ComboboxInput
            class="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 ali focus:ring-0"
            :displayValue="(tenant) => tenant && tenant.name"
            placeholder="Digite o nome da empresa a ser vinculada"
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
            class="absolute mt-1 max-h-40 z-50 w-full overflow-auto rounded-md bg-white py-1 text-sm border border-gray-300 ring-0 focus:outline-none shadow-lg"
          >
            <div
              v-if="filteredTenants.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nenhum Estado encontrado!
            </div>
             <ComboboxOption
              v-for="tenant in filteredTenants"
              as="template"
              :key="tenant.id"
              :value="tenant"
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
                  {{ tenant.name }}
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
