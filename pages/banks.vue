<script setup lang="ts">
import { onMounted } from "vue";
import { useBankStore } from "../stores/BankStore";

const bankStore = useBankStore();

onMounted(async () => {
  bankStore.getAllBanks();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="bankStore.isLoading" />
      <TableBanks v-if="bankStore.banks !== null" :banks="bankStore.banks" />
    </section>
  </NuxtLayout>
</template>
../stores/BankStore
