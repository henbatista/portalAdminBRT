<script setup lang="ts">
// Importando módulos e tipos necessários
import type { ListUsers } from "~/types/users";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useUserStore } from "~/stores/userStore";
import { useMainStore } from "~/stores/MainStore";
import { ref } from "vue";

// Variáveis reativas para lidar com estados de hover
const activeHover = ref({
  is_active: false,
});

const handleMouseOver = () => {
  activeHover.value.is_active = !activeHover.value.is_active;
};

const handleMouseOut = () => {
  activeHover.value.is_active = !activeHover.value.is_active;
};

// Variáveis reativas para o estado de hover do botão
const buttonHover = ref({
  isHovered: false,
});

const handleMouseOverButton = () => {
  buttonHover.value.isHovered = true;
};

const handleMouseOutButton = () => {
  buttonHover.value.isHovered = false;
};

// Acessando stores Pinia
const sidebarStore = useSidebarStoreTenant();
const userStore = useUserStore();
const mainStore = useMainStore();

// Definindo props
const props = defineProps<{
  users: ListUsers | null;
}>();
</script>

<template>
  <!-- Modal para exclusão de usuário -->
  <ModalConfirmation
    title="Deletar Usuário"
    :deleteFunction="userStore.deleteUser"
  />
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <!-- Seção do cabeçalho -->
      <div class="sm:flex-auto mb-3">
        <div class="flex items-center">
          <img
            src="/assets/user-profile.gif"
            alt="Ícone de envio"
            class="w-10 h-10 mr-2"
          />
          <h1 class="text-xl font-semibold text-gray-900 -mb-0">Usuários</h1>
        </div>
        <p class="mt-2 text-sm text-gray-700">
          Adicione, Remova ou Edite o Usuário.
        </p>
      </div>
      <!-- Botão para criar um novo usuário -->
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="
            sidebarStore.sideBarActionTenant = true;
            sidebarStore.currentActionTenant = 'Users';
          "
          type="button"
          class="inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        >
          Criar Novo Usuário
        </button>
      </div>
    </div>

    <!-- Seção da tabela de usuários -->
    <div class="overflow-x-auto mt-5">
      <table class="min-w-full divide-y shadow-lg mb-10 divide-gray-300">
        <thead>
          <tr>
            <th
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Nome
            </th>
            <th
              class="py-3.5 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              E-mail
            </th>
            <th
              class="py-3.5 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              Celular
            </th>
            <th
              class="py-3.5 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              Telefone
            </th>
            <th
              class="py-3.5 md:px-0 px-3 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              Ativo
            </th>
            <th
              class="pr-10 py-3.5 text-right text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, stateIdx) in props.users"
            :data-index="user.id"
            :key="stateIdx"
          >
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 pl-4 text-sm text-left flex flex-col sm:flex-row items-center',
              ]"
            >
              <div class="lg:col-span-3 md:col-span-5 col-span-12">
                <div class="space-y-2 items-center justify-center flex">
                  <div
                    class="h-[50px] w-[50px] mx-auto shadow-md rounded-full ring-1 ring-slate-300 relative"
                  >
                    <img
                      :src="user.avatar || '/assets/user.svg'"
                      alt="Avatar Preview"
                      class="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
              </div>
              <span class="mt-2 sm:ml-4 sm:mt-0">{{ user.name }}</span>
            </td>
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 text-sm text-left',
              ]"
            >
              {{ user.email }}
            </td>
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 text-sm text-left',
              ]"
            >
              {{ user.cellphone }}
            </td>
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 text-sm text-left',
              ]"
            >
              {{ user.phone }}
            </td>
            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 text-sm text-left',
              ]"
            >
              <span
                class="custom-span"
                :class="{
                  'h-[3px] w-[3px] bg-teal-600 rounded-full inline-block ring-4 ring-opacity-30 ring-teal-500':
                    user.is_active,
                  'h-[6px] w-[6px] bg-red-500 rounded-full inline-block ring-4 ring-opacity-30 ring-red-500':
                    !user.is_active,
                }"
                @mouseover="handleMouseOver"
                @mouseout="handleMouseOut"
              ></span>
            </td>

            <td
              :class="[
                stateIdx === 0 ? '' : 'border-t border-gray-200',
                'py-4 pr-10 text-right text-sm font-semibold text-gray-900',
              ]"
            >
              <button
                @click="
                  mainStore.openDeleteModal = true;
                  userStore.idDeleteOrUpdate = user.id;
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
                  sidebarStore.sideBarActionTenant = true;
                  sidebarStore.currentActionTenant = 'Users';
                  userStore.idDeleteOrUpdate = user.id;
                  userStore.name = user.name;
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
