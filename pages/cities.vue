<script setup lang="ts">
import { onMounted } from "vue";
import { useCityStore } from "../stores/CityStore";

const cityStore = useCityStore();

definePageMeta({
  middleware: ['auth']
});

onMounted(async () => {
  cityStore.getAllCities();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="cityStore.isLoading" />
      <TableCities
        v-if="cityStore.cities !== null"
        :cities="cityStore.cities"
      />
    </section>
  </NuxtLayout>
</template>
