<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRecommendedHotelStore } from "~/stores/RecommendedHotelStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import type { HotelRecommended } from "../../types/recommendedHotels";
import { Switch } from "@headlessui/vue";
import { Icon } from "@iconify/vue";

// Definição de ícones relacionados a hotéis
const recommendedStarIcon = "fluent:ribbon-star-20-regular";
const hotelIdIcon = "icon-park-outline:hotel-please-clean";
const providerIcon = "arcticons:providers-id";
const dateIcon = "uiw:date";

// Agrupando ícones em um objeto para fácil acesso
const icons = {
  recommendedStarIcon,
  hotelIdIcon,
  providerIcon,
  dateIcon,
};

// Variável reativa para controlar o estado de 'is_active'
const status = ref(false);

// Assista a mudanças em 'is_active' e imprima o valor no console
watch(status, (newVal) => {
  // Atribuir 1 se is_active for true, 0 se for false
  const value = newVal ? true : false;
  console.log(value); // Aqui você pode usar o valor conforme necessário
});

// Instâncias dos stores e do Toast
const recommendedHotelStore = useRecommendedHotelStore();
const sidebarStore = useSidebarStoreTenant();

const hotelRecommended = ref<HotelRecommended>({
  id: 0,
  idHotel: "",
  provider: "",
  validate_inicial: "",
  validade_final: "",
  status: false,
  created_at: "",
  updated_at: "",
});

function handleSubmit() {
  // Atualize hotelRecommended com os valores atuais da store antes de enviar
  hotelRecommended.value = {
    ...hotelRecommended.value, // Mantém os valores existentes
    ...recommendedHotelStore.selectedHotel, // Atualiza com valores de selectedHotel
    // Defina valores padrão ou atualize campos faltantes aqui, se necessário
  };

  const { idDeleteOrUpdate } = recommendedHotelStore;
  const isUpdate = idDeleteOrUpdate !== 0;
  const saveOrUpdateRecommendedHotels = isUpdate
    ? recommendedHotelStore.updateRecommendedHotel
    : recommendedHotelStore.saveRecommendedHotel;

  console.log("idHotel:", hotelRecommended.value.idHotel);
  saveOrUpdateRecommendedHotels(hotelRecommended.value);
}

onMounted(() => {
  const recommendedHotelsExist = recommendedHotelStore.hotels?.find(
    (hotel) => hotel.id === recommendedHotelStore.idDeleteOrUpdate,
  );
  if (recommendedHotelsExist) {
    hotelRecommended.value.id = recommendedHotelsExist.id;
    hotelRecommended.value.idHotel = recommendedHotelsExist.idHotel;
    hotelRecommended.value.provider = recommendedHotelsExist.provider;
    hotelRecommended.value.validate_inicial =
      recommendedHotelsExist.validate_inicial;
    hotelRecommended.value.validade_final =
      recommendedHotelsExist.validade_final;
    hotelRecommended.value.status = recommendedHotelsExist.status;
  }
});

const providerLocal = ref("");

// Quando o hotel selecionado na store muda, atualize a variável local
watch(
  () => recommendedHotelStore.selectedHotel,
  (newVal) => {
    providerLocal.value = newVal ? newVal.provider : "";
    console.log("providerLocal updated:", providerLocal.value); //
  },
  { immediate: true },
);

// Quando a variável local muda, atualize a store
watch(providerLocal, (newVal) => {
  if (recommendedHotelStore.selectedHotel) {
    recommendedHotelStore.selectedHotel.provider = newVal;
    hotelRecommended.value.provider = newVal;
  }
});
</script>

<template>
  <div class="bg-slate-50 justify-center -mx-6 px-6 py-6">
    <div class="flex justify-between mb-2">
      <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-if="recommendedHotelStore.idDeleteOrUpdate === 0"
        >
          <Icon class="-mt-0.5" :icon="icons.recommendedStarIcon" /> Adicionar
          Hotel Recomendado</span
        >
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-else
        >
          <Icon class="-mt-0.5" :icon="icons.recommendedStarIcon" />
          Atualizar Hotel Recomendado</span
        >
        <div class="flex-1 md:text-base text-xs">
          Preencha os dados para cadastrar um novo Hotel Recomendado.
        </div>
      </div>
      <button @click="sidebarStore.sideBarActionTenant = false">
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
  <div class="mt-3">
    <div class="mx-5">
      <form @submit.prevent="handleSubmit">
        <div class="grid xl:grid-cols-1 grid-cols-1 gap-5">
          <!-- idHotel -->
          <AutoCompleteHotels v-model="hotelRecommended.idHotel" />

          <!-- Provedor -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Provedor
            </label>
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-900 text-base font-light h-full"
                >
                  <Icon :icon="icons.providerIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="providerLocal"
                    name="provider"
                    label="provider"
                    type="text"
                    placeholder="Provedor do hotel"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Validade Inicial -->
          <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                Validade Inicial</label
              >
              <div class="flex mt-1 items-stretch">
                <span class="flex-none input-group-addon">
                  <span
                    class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                  >
                    <Icon :icon="icons.dateIcon" />
                  </span>
                </span>
                <div class="flex-1">
                  <div class="relative fromGroup2">
                    <input
                      v-model="hotelRecommended.validate_inicial"
                      name="vi_Fullname"
                      label="Passaport"
                      type="date"
                      placeholder="Insira o númedo do passaport"
                      class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Validade Final -->
            <div>
              <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                Validade Final</label
              >
              <div class="flex mt-1 items-stretch">
                <span class="flex-none input-group-addon">
                  <span
                    class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                  >
                    <Icon :icon="icons.dateIcon" />
                  </span>
                </span>
                <div class="flex-1">
                  <div class="relative fromGroup2">
                    <input
                      v-model="hotelRecommended.validade_final"
                      name="vi_Fullname"
                      label="Passaport"
                      type="date"
                      placeholder="Insira o númedo do passaport"
                      class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              class="grid gap-1 text-slate-900 md:grid-cols-1 grid-cols-1 mb-2"
            >
              <label class="text-sm mt-1">Manter hotel ativo? </label>
              <Switch
                v-model="hotelRecommended.status"
                :class="status ? 'bg-sky-800' : 'bg-slate-600'"
                class="relative mt-1 inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                <span class="sr-only text-cyan-300"></span>
                <span
                  aria-hidden="true"
                  :class="
                    hotelRecommended.status
                      ? 'translate-x-4'
                      : '-translate-x-0.5'
                  "
                  class="pointer-events-none inline-block h-[18px] -mt-0.5 w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
              </Switch>
            </div>
          </div>
        </div>
      </form>

      <!-- Botão de envio -->
      <div class="grid xl:grid-cols-1 grid-cols-">
        <div class="justify-self-end xl:mt-0 mt-4">
          <div class="text-right mt-6">
            <button
              @click="handleSubmit"
              :class="!recommendedHotelStore.isLoading ? '' : 'opacity-50'"
              class="inline-flex mt-5 transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
            >
              <div
                v-if="!recommendedHotelStore.isLoading"
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
                <span v-if="recommendedHotelStore.idDeleteOrUpdate === 0"
                  >ADICIONAR HOTEL RECOMENDADO</span
                ><span v-else>ATUALIZAR HOTEL RECOMENDADO</span>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button:hover {
  transform: scale(1.02);
}
</style>
