import { defineStore } from "pinia";

export const useSidebarStoreTenant = defineStore("sidebarStoreTenant", () => {
  const currentActionTenant = ref<string>("");
  const sideBarActionTenant = ref(false);
  return {
    currentActionTenant,
    sideBarActionTenant,
  };
});
