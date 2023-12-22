<script setup>
import { ref, watch, computed, defineProps } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import axios from "axios";
import { useToast } from "vue-toastification";
import useApiUrl from "@/composables/useApiUrl";

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();
const toast = useToast();

const tenants = ref([{ name: "Afeganistão", id: 1 }]);
const query = ref("");
const selected = ref([]);
const tenant_ids = ref([]);


const props = defineProps(["updateTenantId"]);

const getAllTenants = async () => {
  try {
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;

    const { data } = await axios.get(
      `${apiUrl}/api/v1/tenants/pluck?search=${query.value}&order=asc&page=1&per_page=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const newTenants = data && data.data ? data.data : [];
    tenants.value = Array.isArray(newTenants) ? newTenants : [];
  } catch (error) {
    toast.error("API do CEP fora do ar, entre em contato com a BRT!");
  }
};

getAllTenants();

const removeItem = (itemToRemove) => {
  selected.value = selected.value.filter(item => item.id !== itemToRemove.id);
};

watch(selected, (newVal) => {
  tenant_ids.value = newVal.map((item) => item.id);
  props.updateTenantId(newVal.map((item) => item.name), tenant_ids.value);
});

watch(query, () => {
  getAllTenants();
});

const filteredTenants = computed(() => 
  tenants.value.filter((tenant) =>
    tenant.name.toLowerCase().includes(query.value.toLowerCase())
  )
);

const updateQuery = (event) => {
  query.value = event.target.value;
};
</script>

<template>
  <div class="w-full">
    <Combobox v-model="selected" multiple>
      <span class="text-sm">Empresa</span>

      <div class="relative mt-1">
        <ComboboxInput
          class="w-full border-none py-2.5 pl-3 pr-10 text-sm leading-5 focus:ring-0"
          placeholder="A quem esta empresa está filiada?"
          @input="updateQuery"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </ComboboxButton>
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
              Nenhuma empresa encontrada!
            </div>
            <ComboboxOption
              v-for="tenant in filteredTenants"
              as="template"
              :key="tenant.id"
              :value="tenant"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-slate-900 text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
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

  <!-- Tabela para exibir itens selecionados -->
  <div class="mt-4 font-sans text-gray-800">
    <span class="block mb-2 text-sm text-slate-900">Itens Selecionados:</span>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm border-collapse">
        <thead>
          <tr>
            <th class="px-2 py-2 border border-gray-900 text-white bg-slate-900">Empresa</th>
            <th class="px-2 py-2 border border-gray-900 text-center text-white bg-slate-900">Excluir</th> <!-- Coluna adicional para ações -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in selected" :key="item.id" class="hover:bg-gray-100">
            <td class="px-2 py-2 border border-gray-700">{{ item.name }}</td>
            <td class="px-2 py-2  text-center border border-gray-700">
              <button @click="removeItem(item)"                 
              class="hover:text-red-600 text-slate-900 transform transition-transform duration-500"
              @mouseover="handleMouseOverButton"
              @mouseout="handleMouseOutButton">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.45 4.06h-4.18v-.5a1.5 1.5 0 0 0-1.5-1.5h-3.54a1.5 1.5 0 0 0-1.5 1.5v.5H4.55a.5.5 0 0 0 0 1h.72l.42 14.45a2.493 2.493 0 0 0 2.5 2.43h7.62a2.493 2.493 0 0 0 2.5-2.43l.42-14.45h.72a.5.5 0 0 0 0-1Zm-9.72-.5a.5.5 0 0 1 .5-.5h3.54a.5.5 0 0 1 .5.5v.5H9.73Zm7.58 15.92a1.5 1.5 0 0 1-1.5 1.46H8.19a1.5 1.5 0 0 1-1.5-1.46L6.26 5.06h11.48Z"
                />
                <path
                  fill="currentColor"
                  d="M8.375 8a.5.5 0 0 1 1 0l.25 10a.5.5 0 0 1-1 0Zm7.25.007a.5.5 0 0 0-1 0l-.25 10a.5.5 0 0 0 1 0Z"
                />
              </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>
<style>
@media screen and (max-width: 600px) {
  .sm\:text-xs { font-size: 0.75rem; }
  .sm\:px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
  .sm\:py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
}
</style>
