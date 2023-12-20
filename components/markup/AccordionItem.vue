<script setup>
import { Icon } from "@iconify/vue";

// Props do componente
const props = defineProps(["title", "icon"]);

// Estado local para controlar se o conteúdo está aberto ou fechado
const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- Botão que controla a abertura/fechamento do conteúdo -->
    <div
    @click="isOpen = !isOpen"
    class="inline-flex mt-3 transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 cursor-pointer w-full"
  >
    <span class="mr-2">
      <!-- Ícone associado ao botão -->
      <Icon :icon="icon" /> 
    </span>
    {{ title }}
  </div>
    
    <!-- Transição para mostrar/ocultar o conteúdo -->
    <transition name="fade">
      <div v-if="isOpen" class="py-2">
        <!-- Slot para conteúdo interno do componente -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style>
/* Estilos para a transição de fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
  transition: opacity 0.3s ease-in;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
