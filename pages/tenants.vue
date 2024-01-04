<script setup lang="ts">
import TableTenant from "~/components/tenants/TableTenant.vue";
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
      <TableTenant
        v-if="tenantStore.tenants !== null"
        :tenants="tenantStore.tenants"
      />
    </section>
  </NuxtLayout>
</template>
~/stores/tet
