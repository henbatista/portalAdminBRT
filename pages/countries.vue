<script setup lang="ts">
import { onMounted } from "vue";
import { useCountryStore } from "../stores/CountryStore";

const countryStore = useCountryStore();

onMounted(async () => {
  countryStore.getAllCountries();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="countryStore.isLoading" />
      <TableCountry  v-if="countryStore.countries !== null" :countries="countryStore.countries"/>
    </section>
  </NuxtLayout>
</template>
