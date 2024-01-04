<script setup lang="ts">
import { useCountryStore } from "~/stores/CountryStore";
import { useSidebarStore } from "~/stores/SidebarStore";
import { Icon } from "@iconify/vue";

const countryStore = useCountryStore();
const sidebarStore = useSidebarStore();

const countryIcon = "gis:search-country";
const countryNameIcon = "emojione-monotone:world-map";
const countryNameOfficialIcon = "gis:map-book";
const countryCodeIcon = "ph:phone-plus-light";
const countryIsoIcon = "carbon:iso-outline";

const icons = {
  countryIcon,
  countryNameIcon,
  countryNameOfficialIcon,
  countryCodeIcon,
  countryIsoIcon,
};

function handleCountry() {
  if (countryStore.idDeleteOrUpdate === 0) {
    countryStore.saveCountry(
      countryStore.name,
      countryStore.formal_name,
      countryStore.phone_code,
      countryStore.iso,
      countryStore.iso3,
    );
  } else {
    countryStore.updateCountry();
  }
}
</script>

<template>
  <div class="bg-slate-50 justify-center -mx-6 px-6 py-6">
    <div class="flex justify-between mb-2">
      <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-if="countryStore.idDeleteOrUpdate === 0"
        >
          <Icon class="-mt-0.5" :icon="icons.countryIcon" /> Adicionar
          País</span
        >
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-else
        >
          <Icon class="-mt-0.5" :icon="icons.countryIcon" />
          Atualizar País</span
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

  <section class="flex mt-4 p-6 flex-col gap-4">
    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]">Nome do País</label>
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.countryNameIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              v-model="countryStore.name"
              type="text"
              id="name"
              placeholder="Digite o nome do país"
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]">
        Nome Oficial do País</label
      >
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.countryNameOfficialIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              v-model="countryStore.formal_name"
              type="text"
              id="formal_name"
              placeholder="Digite o nome oficial do país"
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]">
        Código do País (Telefone)</label
      >
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.countryCodeIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              v-model="countryStore.phone_code"
              type="number"
              v-maska
              data-maska="####"
              id="phone_code"
              placeholder="Digite o código de telefone do país "
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]">
        Código ISO (2 letras)</label
      >
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.countryIsoIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              v-model="countryStore.iso"
              name="name"
              type="text"
              id="iso"
              placeholder="Digite o código ISO do país com duas letras"
              maxlength="2"
              oninput="this.value = this.value.replace(/[^a-zA-Z]/g, '');"
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]">
        Código ISO (3 dígitos)</label
      >
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.countryIsoIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              type="text"
              id="iso3"
              v-model="countryStore.iso3"
              maxlength="3"
              oninput="this.value = this.value.replace(/[^a-zA-Z]/g, '');"
              placeholder="Digite o código ISO do país com 3 dígitos "
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
          </div>
        </div>
      </div>
    </div>

    <button
      @click="handleCountry"
      :class="!countryStore.isLoading ? '' : 'opacity-50'"
      class="inline-flextransition-all mt-5 duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
    >
      <div
        v-if="!countryStore.isLoading"
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
        <span v-if="countryStore.idDeleteOrUpdate === 0">ADICIONAR PAÍS</span
        ><span v-else>ATUALIZAR PÁIS</span>
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

<style scoped>
button:hover {
  transform: scale(1.02);
}
</style>
