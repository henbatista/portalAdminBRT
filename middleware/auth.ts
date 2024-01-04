import { defineNuxtRouteMiddleware, useNuxtApp } from "nuxt/app";
import { useAuthStore } from "@/stores/AuthStore";
import { useToast } from "vue-toastification";

const toast = useToast();

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { $router } = useNuxtApp(); // Utilize $toast aqui

  // Verifica se o usuário está autenticado
  if (!authStore.token) {
    // Se estiver tentando acessar a página de login enquanto autenticado, redirecione para o dashboard
    if (to.path === "/markup" && authStore.isAuthenticated) {
      return $router.push("/markup");
    }

    // Exibe uma mensagem de erro e redireciona para a página de login
    toast.warning("Você precisa estar logado para acessar esta página."); // Modificado para usar $toast
    return navigateTo("/");
  }

  // O usuário está autenticado, permita o acesso à rota
});
