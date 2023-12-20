<script setup lang="ts">
import { onMounted } from "vue";
import { useMarkupStore } from "../stores/MarkupStore";

const markupStore = useMarkupStore();

onMounted(async () => {
  markupStore.getAllMarkup();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="markupStore.isLoading" />
      <TableMarkup v-if="markupStore.markups !== null" :markups="markupStore.markups" />
    </section>
  </NuxtLayout>
</template>
