<script setup lang="ts">
import type { ListStates } from "~/types/states";
import { useSidebarStore } from "~/stores/SidebarStore";
const sidebarStore = useSidebarStore();
import { useStateStore } from "~/stores/StatesStore";
const stateStore = useStateStore();
import { useMainStore } from "~/stores/MainStore";
const mainStore = useMainStore();
import { ref } from "vue";

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
  states: ListStates | null;
}>();
</script>

<template>
  <ModalConfirmation
    title="Deletar Estado"
    :deleteFunction="stateStore.deleteStates"
  />
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto mb-3">
        <div class="flex items-center">
          <img
            src="/assets/map.gif"
            alt="Ícone de envio"
            class="w-10 h-10 mr-2"
          />
          <h1 class="text-xl font-semibold text-gray-900 -mb-0">Estado</h1>
        </div>
        <p class="mt-2 text-sm text-gray-700">
          Adicione, Remova ou Edite um Estado.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="
            sidebarStore.sideBarAction = true;
            sidebarStore.currentAction = 'States';
          "
          type="button"
          class="inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        >
          Criar Novo Estado
        </button>
      </div>
    </div>

    <!-- Seção da tabela de Estado -->
    <div class="overflow-x-auto mt-5">
      <table class="min-w-full divide-y shadow-lg mb-10 divide-gray-300">
        <thead>
          <tr>
            <th
              class="py-2 md:py-3.5 pl-4 pr-3 text-left text-xs md:text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Nome
            </th>
            <th
              class="py-2 md:py-3.5 md:px-3 px-10 text-left text-xs md:text-sm font-semibold text-slate-900 bg-gray-50"
            >
              País
            </th>
            <th
              class="py-2 md:pr-10 p-4 pr-3 md:py-3.5 text-right text-xs md:text-sm font-semibold text-slate-900 bg-gray-50"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(state, stateIdx) in props.states" :key="stateIdx">
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-2 md:px-4 px-3 md:py-4 text-xs md:text-sm text-left',
              ]"
            >
              {{ state.name }}
            </td>
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-2 md:px-3 px-10 md:py-4 text-xs md:text-sm text-left',
              ]"
            >
              {{ state.country }}
            </td>

            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-2  md:py-4 md:pr-10 pr-6 text-xs md:text-sm text-right',
              ]"
            >
              <button
                @click="
                  mainStore.openDeleteModal = true;
                  stateStore.idDeleteOrUpdate = state.id;
                "
                class="hover:text-red-600 ml-2 text-slate-900 transform transition-transform duration-500"
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
                  sidebarStore.sideBarAction = true;
                  sidebarStore.currentAction = 'States';
                  stateStore.idDeleteOrUpdate = state.id;
                  stateStore.name = state.name;
                  stateStore.country_id = state.id;
                "
                class="hover:text-lime-600 ml-2 text-slate-900 transform transition-transform duration-500"
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
.btn-outline-dark {
  @apply bg-transparent text-slate-900     hover:bg-slate-900 hover:bg-opacity-5;
  &.active {
    @apply bg-slate-900 text-white dark:bg-slate-900 dark:text-slate-300;
  }
}

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
