import { defineStore } from "pinia";
import type { TenantData } from "~/types/login";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const data = ref<TenantData | null>(null);
    const token = ref<string>("");
    return {
      data,
      token,
    };
  },
  { persist: { storage: persistedState.localStorage } },
);
