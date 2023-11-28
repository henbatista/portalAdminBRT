<script setup lang="ts">
import { onMounted } from "vue";
import { useExchangesStore } from "../stores/ExchangesStore";

const exchangesStore = useExchangesStore();

onMounted(async () => {
  exchangesStore.getAllExchanges();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="exchangesStore.isLoading" />
      <TableExchanges
        v-if="exchangesStore.exchanges !== null"
        :exchanges="exchangesStore.exchanges"
      />
    </section>
  </NuxtLayout>
</template>
