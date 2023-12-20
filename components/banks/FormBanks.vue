<script setup lang="ts">
import { ref } from "vue";
import { useBankStore } from "~/stores/BankStore";
import { useSidebarStore } from "~/stores/SidebarStore";
import { Icon } from "@iconify/vue";

const bankIcon = "mingcute:bank-line";
const bankNumberIcon = "octicon:number-24";
const bankNameIcon = "ph:bank-light";

const icons = {
  bankIcon,
  bankNumberIcon,
  bankNameIcon,
};

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
  <form class="space-y-4 px-6">
    <div class="bg-slate-50 justify-center -mx-6 px-6 py-6">
      <div class="flex justify-between mb-2">
        <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
          <span
            class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            v-if="bankStore.idDeleteOrUpdate === 0"
          >
            <Icon class="-mt-0.5" :icon="icons.bankIcon" /> Adicionar
            Banco</span
          >
          <span
            class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            v-else
          >
            <Icon class="-mt-0.5" :icon="icons.bankIcon" />
            Atualizar Banco</span
          >
          <div class="flex-1 md:text-base text-xs">
            Preencha os dados para cadastrar um novo banco.
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
      <div>
        <label class="flex-0 text-sm md:w-[100px] w-[60px]">
          Número do Banco</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.bankNumberIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                v-model="bankStore.bankNumber"
                name="name"
                id="bankNumber"
                v-maska
                data-maska="###"
                placeholder="000"
                type="text"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label class="flex-0 text-sm md:w-[100px] w-[60px]">
          Nome do Banco</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.bankNameIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                v-model="bankStore.name"
                name="name"
                type="text"
                id="bankName"
                placeholder="Digite o nome do banco..."
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        @click="handleBank"
        :class="!bankStore.isLoading ? '' : 'opacity-50'"
        class="inline-flex mt-5 transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
      >
        <div
          v-if="!bankStore.isLoading"
          class="flex justify-center gap-5 items-center"
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
  </form>
</template>

<style lang="scss" scoped>
button:hover {
  transform: scale(1.02);
}
</style>
