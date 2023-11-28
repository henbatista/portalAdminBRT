import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebarStore", () => {
  const currentAction = ref<string>("");
  const sideBarAction = ref(false);
  return {
    currentAction,
    sideBarAction,
  };
});
