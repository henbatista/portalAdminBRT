<script setup lang="ts">
import { onMounted } from "vue";
import { useStateStore } from "../stores/StatesStore";

const stateStore = useStateStore();

onMounted(async () => {
  stateStore.getAllStates();
});
</script>

<template>
  <NuxtLayout name="dashboard-layout">
    <section>
      <Spinner v-if="stateStore.isLoading" />
      <TableStates
        v-if="stateStore.states !== null"
        :states="stateStore.states"
      />
    </section>
  </NuxtLayout>
</template>
