// middleware/auth.ts
import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useAuthStore } from '@/stores/AuthStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (!authStore.token) {
    // O usuário não está autenticado, redirecione para a página de login
    return navigateTo('/');
  }

  // O usuário está autenticado, permita o acesso à rota
});
