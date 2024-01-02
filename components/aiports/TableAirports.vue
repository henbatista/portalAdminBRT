<script setup lang="ts">
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useMainStore } from "~/stores/MainStore";
import { Icon } from "@iconify/vue";
import type { IListAirports } from "~/types/airports";
import { ref } from "vue";

const mainStore = useMainStore();
const sidebarStoreTenant = useSidebarStoreTenant();
const airportStore = useAirportStore();

const plus = "iconoir:plus";

const icons = {
  plus,
};

const buttonHover = ref({
  isHovered: false,
});

const handleMouseOverButton = () => {
  buttonHover.value.isHovered = true;
};

const handleMouseOutButton = () => {
  buttonHover.value.isHovered = false;
};

const props = defineProps<{
  airports: IListAirports | null;
}>();
</script>

<template>
  <ModalConfirmation
    title="Deletar Aeroporto"
    :deleteFunction="airportStore.deleteAirport"
  />
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <!-- Seção do cabeçalho -->
      <div class="sm:flex-auto mb-3">
        <div class="flex items-center">
          <img
            src="/assets/airport.gif"
            alt="Ícone de envio"
            class="w-10 h-10 mr-2"
          />
          <h1 class="text-xl font-semibold text-gray-900 -mb-0">Aeroportos</h1>
        </div>
        <p class="mt-2 text-sm text-gray-700">
          Adicione, Remova ou Edite uma Aeroporto.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="
            sidebarStoreTenant.sideBarActionTenant = true;
            sidebarStoreTenant.currentActionTenant = 'Airports';
          "
          type="button"
          class="inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        >
          Criar Novo Aeroporto
        </button>
      </div>
    </div>

    <div class="overflow-x-auto mt-5">
      <table class="min-w-full divide-y shadow-lg mb-10 divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Aeroporto
            </th>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Cidade
            </th>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Estado
            </th>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 bg-gray-50"
            >
              País
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
          <tr v-for="(airport, airportIdx) in props.airports" :key="airportIdx">
            <td
              :class="[
                airportIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pl-4 text-sm text-left',
              ]"
            >
              {{ airport.name }}
            </td>
            <td
              :class="[
                airportIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pl-4 text-sm text-center',
              ]"
            >
              {{
                airport.cities.length > 0
                  ? airport.cities[0].name
                  : "Sem cidade"
              }}
            </td>
            <td
              :class="[
                airportIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-center',
              ]"
            >
              {{
                airport.cities.length > 0
                  ? airport.cities[0].state
                  : "Sem estado"
              }}
            </td>
            <td
              :class="[
                airportIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-center',
              ]"
            >
              {{
                airport.cities.length > 0
                  ? airport.cities[0].country
                  : "Sem país"
              }}
            </td>
            <td
              :class="[
                airportIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 pr-10 text-right text-sm font-semibold text-gray-900',
              ]"
            >
              <button
                @click="
                  mainStore.openDeleteModal = true;
                  airportStore.idDeleteOrUpdate = airport.id;
                "
                class="hover:text-red-600 text-slate-900 transform transition-transform duration-500"
                @mouseover="handleMouseOverButton"
                @mouseout="handleMouseOutButton"
              >
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
              <button
                @click="
                  sidebarStoreTenant.sideBarActionTenant = true;
                  sidebarStoreTenant.currentActionTenant = 'Airports';
                  airportStore.idDeleteOrUpdate = airport.id;
                "
                class="hover:text-lime-600 text-slate-900 transform transition-transform duration-500"
                @mouseover="handleMouseOverButton"
                @mouseout="handleMouseOutButton"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.71 8.04l-2.34 2.33l-3.75-3.75l2.34-2.33c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25L13.06 7.18l3.75 3.75L6.75 21H3v-3.75M16.62 5.04l-1.54 1.54l2.34 2.34l1.54-1.54l-2.34-2.34M15.36 11L13 8.64l-9 9.02V20h2.34l9.02-9Z"
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
/* Estilização para o span personalizado que representa o status de atividade do usuário */

.custom-span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  transition:
    background-color 0.3s ease,
    transform 0.5s ease;
}
/* Estilização para os indicadores de status de atividade do usuário */
/* Cor padrão quando o plano de fundo é teal */
.bg-teal-600 {
  background-color: #319795;
}

/* Cor padrão quando o plano de fundo é vermelho */
.bg-red-500 {
  background-color: #e53e3e;
}

/* Tonalidade mais clara de vermelho quando o plano de fundo é vermelho */
.custom-span.bg-red-500:hover {
  background-color: #fc8181;
  transform: scale(1.2); /* Aumenta em 20% durante o hover */
}

/* Cor durante a interação quando o plano de fundo é teal */
.custom-span.bg-teal-600:hover {
  background-color: #4fd1c5;
  transform: scale(1.2); /* Aumenta em 20% durante o hover */
}

/* Estilização para o efeito de hover do botão */
button:hover {
  transform: scale(1.05);
}
</style>
