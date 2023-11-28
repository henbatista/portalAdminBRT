<script setup lang="ts">
useHead({
  title: "Portal Administração",
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap",
      crossorigin: "",
    },
  ],
});
</script>
<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
h1 {
  @apply text-2xl lg:text-3xl font-bold mb-6;
}
</style>
