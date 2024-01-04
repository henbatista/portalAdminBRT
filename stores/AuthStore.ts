import { defineStore } from "pinia";
import type { TenantData } from "~/types/login";
import { ref, computed } from "vue";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const data = ref<TenantData | null>(null);
    const token = ref<string>("");

    // Getter para verificar se o usuário está autenticado
    const isAuthenticated = computed(() => {
      return token.value !== ""; // Verifica se o token não é uma string vazia
    });

    return {
      data,
      token,
      isAuthenticated, // Inclua isso no retorno para que seja acessível fora da store
    };
  },
  { persist: { storage: persistedState.localStorage } },
);
