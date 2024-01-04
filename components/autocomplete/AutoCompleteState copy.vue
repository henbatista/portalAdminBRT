<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import axios from "axios";
import useApiUrl from "@/composables/useApiUrl";
import { Icon } from "@iconify/vue";

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

const props = defineProps({
  stateId: {
    type: Number,
    required: true,
  },
  updateStateId: {
    type: Function,
  },
});

interface IState {
  name: string;
  id: number;
}

const stateIcon = "arcticons:50-us-states-map";

const icons = {
  stateIcon,
};

const states = ref<IState[]>([]);
const isLoading = ref(false);
const searchQuery = ref("");
const userInput = ref(true);

watch(searchQuery, (newSearchQuery) => {
  if (userInput.value && newSearchQuery.length > 2) {
    isLoading.value = true;
    fetchStates(newSearchQuery);
  } else {
    states.value = [];
  }
});

const updateInput = (nameSelectedState: string, idSelectedState: number) => {
  userInput.value = false; // Indicar que a atualização não é do usuário
  searchQuery.value = nameSelectedState;
  if (typeof props.updateStateId === "function") {
    props.updateStateId(nameSelectedState, idSelectedState);
  }

  nextTick(() => {
    states.value = []; // Limpa a lista, se você quiser
    userInput.value = true; // Voltar ao estado original
  });
};

const fetchStates = async (stringSearch: string) => {
  try {
    // Pegar o token do localStorage
    const authLocalStore = JSON.parse(
      localStorage.getItem("authStore") || "{}",
    );
    const token = authLocalStore.token;
    const { data } = await axios.get(
      `${apiUrl}/api/v1/states/pluck?search=${stringSearch}&per_page=10&order=asc&page=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    states.value = data.data;
  } catch (error) {
    console.error("Erro ao buscar estados:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div>
      <label class="flex-0 text-sm md:w-[100px] w-[60px]"> Estado</label>
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
            class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-800 text-base font-light h-full"
          >
            <Icon :icon="icons.stateIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
              type="text"
              id="city"
              v-model="searchQuery"
              autocomplete="off"
              placeholder="Digite o nome do Estado"
              class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
            />
            <div
              v-if="states.length"
              class="w-full bg-white mt-1 p-2 border text-sm border-gray-300 rounded max-h-40 overflow-y-auto shadow-lg"
            >
              <div
                v-for="state in states"
                :key="state.id"
                class="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                @click="updateInput(state.name, state.id)"
              >
                {{ state.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
