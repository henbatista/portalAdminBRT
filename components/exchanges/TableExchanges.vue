<script setup lang="ts">
import type { ListExchangeRates } from "~/types/exchanges";
import { useSidebarStore } from "~/stores/SidebarStore";
const sidebarStore = useSidebarStore();
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const plus = "iconoir:plus";
const libra = "ph:currency-gbp-light";
const euro = "ph:currency-eur-light";
const dolar = "mdi-light:currency-usd";

const icons = {
  plus,
  libra,
  euro,
  dolar,
};

const props = defineProps<{
  exchanges: ListExchangeRates | null;
}>();
</script>
<style>
#paused {
  animation-play-state: paused;
}
</style>

<template>
  <ModalConfirmation />

  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto mb-3">
        <div class="flex items-center">
          <img
            src="/assets/exchange.gif"
            alt="Ícone de envio"
            id="paused"
            class="w-10 h-10 mr-2"
          />
          <h1 class="text-xl font-semibold text-gray-900 -mb-0">Câmbio</h1>
        </div>
        <p class="mt-2 text-sm text-gray-700">Adicione o câmbio do dia.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="
            sidebarStore.sideBarAction = true;
            sidebarStore.currentAction = 'Exchanges';
          "
          type="button"
          class="inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        >
          Criar Novo Câmbio
        </button>
      </div>
    </div>

    <!-- Seção da tabela de Cotação -->
    <div class="overflow-x-auto mt-5">
      <table class="min-w-full divide-y shadow-lg mb-10 divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              DATA
            </th>

            <th
              scope="col"
              class="py-3.5 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              <div class="flex items-center justify-center space-x-1">
                <Icon :icon="icons.dolar" class="w-4 h-4" />
                <span>USD</span>
              </div>
            </th>

            <th
              scope="col"
              class="py-3.5 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              <div class="flex items-center justify-center space-x-1">
                <Icon :icon="icons.euro" class="w-4 h-4" />
                <span>EUR</span>
              </div>
            </th>
            <th
              scope="col"
              class="py-3.5 text-left text-sm font-semibold text-slate-900 bg-gray-50"
            >
              <div class="flex items-center justify-center space-x-1">
                <Icon :icon="icons.libra" class="w-4 h-4" />
                <span>GBP</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(exchange, exchangeIdx) in props.exchanges"
            :key="exchangeIdx"
          >
            <td
              :class="[
                exchangeIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pl-4 text-sm text-left',
              ]"
            >
              {{ exchange.created_at }}
            </td>
            <td
              :class="[
                exchangeIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-center',
              ]"
            >
              {{ exchange.USD }}
            </td>
            <td
              :class="[
                exchangeIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-center',
              ]"
            >
              {{ exchange.EUR }}
            </td>
            <td
              :class="[
                exchangeIdx === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-center',
              ]"
            >
              {{ exchange.GBP }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
/* Estilização para o span personalizado que representa o status de atividade do usuário */

/* Estilização para o efeito de hover do botão */
button:hover {
  transform: scale(1.05);
}
</style>
