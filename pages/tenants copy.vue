<script setup lang="ts">
import { useTenantStore } from "~/stores/TenantStore";

const tenantStore = useTenantStore();

definePageMeta({
  middleware: ["auth"],
});

onMounted(async () => {
  tenantStore.getAllTenants();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="tenantStore.isLoading" />
      <TableHotelsrecommended
        v-if="tenantStore.tenants !== null"
        :tenants="tenantStore.tenants"
      />
    </section>
  </NuxtLayout>
</template>
~/stores/tet
