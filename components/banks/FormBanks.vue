<script setup lang="ts">
import { ref } from "vue";
import { useBankStore } from "~/stores/BankStore";
import { useSidebarStore } from "~/stores/SidebarStore";

const bankStore = useBankStore();
const sidebarStore = useSidebarStore();

// const bankNumber = ref(bankStore.bankNumber);
// const name = ref(bankStore.name);

function handleBank() {
  if (bankStore.idDeleteOrUpdate === 0) {
    bankStore.saveBank(bankStore.bankNumber, bankStore.name);
  } else {
    bankStore.updateBank();
  }
}

</script>

<template>
  <div class="bg-slate-50 justify-center  -mx-6 px-6 py-6">
    <div class="flex justify-between  mb-2">
      <div class="ml-6 grid lg:grid-cols-1 grid-cols-1">
        <span
        class="text-2xl font-bold flex gap-2 items-center"
        v-if="bankStore.idDeleteOrUpdate === 0"
      >
        Adicionar Banco</span
      >
      <span class="text-2xl font-bold flex gap-2 items-center" v-else>
        Atualizar Banco</span
      >
        <div class="flex-1 md:text-base text-xs"> 
          Preencha os dados para cadastrar um novo Estado.
        </div>
      </div>
      <button @click="sidebarStore.sideBarAction = false">
        <svg
        class="mr-7"
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
    </div>
  <section class="flex mt-4 flex-col gap-4">
    <div class="flex flex-col">
      <label for="bankNumber" class="font-bold text-xs mb-2"
        >Número do Banco</label
      >
      <input
        type="text"
        id="bankNumber"
        v-maska
        data-maska="###"
        placeholder="000"
        v-model="bankStore.bankNumber"
        class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300 mb-3"
      />
    </div>
    <div class="flex flex-col">
      <label for="bankName" class="font-bold text-xs mb-2">Nome do Banco</label>
      <input
        type="text"
        id="bankName"
        placeholder="Digite o nome do banco..."
        v-model="bankStore.name"
        class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300 mb-3"
      />
    </div>
    <button
      @click="handleBank"
      :class="!bankStore.isLoading ? '' : 'opacity-50'"
      class="inline-flex mt-5 transition-all  duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950  bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
    >
      <div v-if="!bankStore.isLoading" class="flex justify-center items-center">
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
        <span v-if="bankStore.idDeleteOrUpdate === 0">ADICIONAR BANCO</span
        ><span v-else>ATUALIZAR BANCO</span>
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
