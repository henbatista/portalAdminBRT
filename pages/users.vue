<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

definePageMeta({
  middleware: ["auth"],
});

onMounted(async () => {
  userStore.getAllUser();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="userStore.isLoading" />
      <TableUsers v-if="userStore.users !== null" :users="userStore.users" />
    </section>
  </NuxtLayout>
</template>
