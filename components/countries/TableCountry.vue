<script setup lang="ts">
import type { ListCountries } from "~/types/country";
import { useSidebarStore } from "~/stores/SidebarStore";
const sidebarStore = useSidebarStore();
import { useCountryStore } from "~/stores/CountryStore";
const countryStore = useCountryStore();
import { useMainStore } from "~/stores/MainStore";
const mainStore = useMainStore();
import { Icon } from "@iconify/vue";

const plus = "iconoir:plus";

const icons = {
  plus,
};

const props = defineProps<{
  countries: ListCountries | null;
}>();


</script>

<template>
  <ModalConfirmation
    title="Deletar Banco"
    :deleteFunction="countryStore.deleteCountry"
  />
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <div class="items-center mb-4">
          <h1 class="font-semibold">Países</h1>
          <p class="-mt-5 Text-slate-700 text-left text-base font-normal">
            Adicione, Remova ou Edite a lista de país.
          </p>
        </div>

      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">

        <button
          @click="
            sidebarStore.sideBarAction = true;
            sidebarStore.currentAction = 'Countries';
          "
          type="button"
          class="inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950  bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        >
        <span>
        <Icon :icon="icons.plus" />
      </span>
         <div class="ml-2 ">
          Criar Novo País
        </div>
        </button>
      </div>
    </div>
    <div  
      class="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 md:mx-0 md:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Nome
            </th>
            <th
              scope="col"
              class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Nome Oficial do País
            </th>
            <th
            scope="col"
            class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
          >
            Código do País (Telefone)
          </th>
          <th
          scope="col"
          class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
        >
          Código ISO  (2 dígitos)
        </th>
        <th
        scope="col"
        class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
      >
        Código ISO (3 dígitos)
      </th>
            <th
              scope="col"
              class="pr-5 py-3.5 text-right text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(country, countryIdx) in props.countries" :key="countryIdx">
            <td
              :class="[
                countryIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pl-4 text-sm text-left',
              ]"
            >
              {{ country.name }}
            </td>
            <td
              :class="[
                countryIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-left',
              ]"
            >
              {{ country.formal_name }}
            </td>
            <td
            :class="[
              countryIdx === 0 ? '' : 'border-t border-gray-200',
              'relative py-4  text-sm text-left',
            ]"
          >
            {{ country.phone_code }}
          </td>
          <td
          :class="[
            countryIdx === 0 ? '' : 'border-t border-gray-200',
            'relative py-4  text-sm text-left',
          ]"
        >
          {{ country.iso }}
          
        </td>

        <td
        :class="[
          countryIdx === 0 ? '' : 'border-t border-gray-200',
          'relative py-4  text-sm text-left',
        ]"
      >
        {{ country.iso3 }}
      </td>
            <td
              :class="[
                countryIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pr-5 text-sm flex justify-end gap-3',
              ]"
            >
              <button
                @click="
                  mainStore.openDeleteModal = true;
                  countryStore.idDeleteOrUpdate = country.id;
                "
                class="text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="1.5"
                    d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5"
                  />
                </svg>
              </button>
              <button
                @click="
                  sidebarStore.sideBarAction = true;
                  sidebarStore.currentAction = 'Countries';
                  countryStore.idDeleteOrUpdate = country.id;
                  countryStore.name = country.name;
                  countryStore.formal_name = country.formal_name;
                  countryStore.phone_code = country.phone_code;
                  countryStore.iso = country.iso;
                  countryStore.iso3 = country.iso3;
                "
                class="text-lime-600"
              >
              
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 19h1.4l8.625-8.625l-1.4-1.4L5 17.6V19ZM19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125l-2.8 2.8ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21H3ZM14.325 9.675l-.7-.7l1.4 1.4l-.7-.7Z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-outline-dark {
  @apply bg-transparent text-slate-900     hover:bg-slate-900 hover:bg-opacity-5;
  &.active {
    @apply bg-slate-900 text-white dark:bg-slate-900 dark:text-slate-300;
  }
}
</style>

