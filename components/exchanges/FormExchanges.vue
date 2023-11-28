<script setup lang="ts">
import { ref } from "vue";
import { useExchangesStore } from "~/stores/ExchangesStore";
import { useSidebarStore } from "~/stores/SidebarStore";

const exchangesStore = useExchangesStore();
const sidebarStore = useSidebarStore();

const usd = ref("");
const eur = ref("");
const gbp = ref("");
const isLoading = ref(false);

function saveExchanges() {
  exchangesStore.saveExchanges(usd.value, eur.value, gbp.value);
}
</script>

<template>
  <div class="flex justify-between items-center w-full">
    <span class="text-2xl font-bold flex gap-2 items-center">
      Adicionar Câmbio</span
    >
    <button @click="sidebarStore.sideBarAction = false">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
        />
      </svg>
    </button>
  </div>
  <section class="flex mt-4 flex-col gap-4">
    <div class="flex flex-col">
      <label for="USD" class="font-bold text-xs mb-2">USD</label>
      <input
        type="text"
        id="USD"
        v-maska
        data-maska="#,##"
        placeholder="0,00"
        v-model="usd"
        class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300 mb-3"
      />
    </div>
    <div class="flex flex-col">
      <label for="EURO" class="font-bold text-xs mb-2">EURO</label>
      <input
        type="text"
        id="EURO"
        v-maska
        data-maska="#,##"
        placeholder="0,00"
        v-model="eur"
        class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300 mb-3"
      />
    </div>
    <div class="flex flex-col">
      <label for="GBP" class="font-bold text-xs mb-2">GBP</label>
      <input
        type="text"
        id="GBP"
        v-maska
        data-maska="#,##"
        placeholder="0,00"
        v-model="gbp"
        class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300 mb-3"
      />
    </div>
    <button
      @click="saveExchanges"
      :class="!exchangesStore.isLoading ? '' : 'opacity-50'"
      class="h-12 bg-blue-800 text-white px-4 rounded-md text-xs font-bold flex items-center w-full justify-center mt-4"
    >
      <div
        v-if="!exchangesStore.isLoading"
        class="flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5Z"
          />
        </svg>
        ADICIONAR CÂMBIO
      </div>
      <div v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="#ffffff"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            fill="#ffffff"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
      </div>
    </button>
  </section>
</template>

<style scoped></style>
