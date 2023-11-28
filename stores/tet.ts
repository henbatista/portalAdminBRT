import { defineStore } from 'pinia';

export const useTenantStore = defineStore('tenantStore', () => {
  const sideBarOpen = ref(false);
  return {
    sideBarOpen,
  };
});
