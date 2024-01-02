<script setup lang="ts">
import { onMounted } from "vue";
import { useAirportStore } from "../stores/AirportStore";

const airportStore = useAirportStore();

definePageMeta({
  middleware: ['auth']
});

onMounted(async () => {
  airportStore.getAllAirports();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="airportStore.isLoading" />
      <TableAirports
        v-if="airportStore.airports !== null"
        :airports="airportStore.airports"
      />
    </section>
  </NuxtLayout>
</template>
