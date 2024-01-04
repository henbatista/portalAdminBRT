<script setup lang="ts">
import { onMounted } from "vue";
import { useRecommendedHotelStore } from "../stores/RecommendedHotelStore";

const recommendedHotelStore = useRecommendedHotelStore();

definePageMeta({
  middleware: ["auth"],
});

onMounted(async () => {
  recommendedHotelStore.getAllRecommendedHotel();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="recommendedHotelStore.isLoading" />
      <TableRecommendedHotel
        v-if="recommendedHotelStore.hotels !== null"
        :hotels="recommendedHotelStore.hotels"
      />
    </section>
  </NuxtLayout>
</template>
