import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", () => {
  const openDeleteModal = ref(false);
  return {
    openDeleteModal,
  };
});
