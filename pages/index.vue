<script setup lang="ts">
import { ref } from "vue";
import { login } from "./../services/authService";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../stores/AuthStore";
const authStore = useAuthStore();
const toast = useToast();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

async function handleLogin() {
  isLoading.value = true;
  errorMessage.value = ""; // Limpa a mensagem de erro anterior
  try {
    const response = await login(email.value, password.value);
    if (response.success) {
      authStore.data = response.data.data;
      authStore.token = response.data.token;
      toast.success("Login efetuado com sucesso!", {
        onClose: () => {
          navigateTo("/markups");
        },
      });
    } else {
      toast.error("Usuário/Senha inválidos!");
      isLoading.value = false;
    }
  } catch (e) {
    toast.error("Problemas com API da BRT. Avise o suporte!");
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="flex">
    <section
      class="bg-blue-500 w-1/2 flex flex-col items-center justify-center h-screen bg-[url('/assets/bg-birthday.jpg')] bg-no-repeat bg-center bg-cover"
    ></section>
    <section class="flex w-1/2 justify-center items-center p-4">
      <div class="w-full max-w-sm">
        <h1>Login / Consolidadora</h1>
        <form
          action=""
          @submit.prevent="handleLogin"
          class="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Email/Usuário"
            class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300"
            v-model="email"
          />
          <input
            type="password"
            placeholder="Senha"
            class="h-12 p-4 rounded-md border border-gray-200 text-sm placeholder-gray-300"
            v-model="password"
          />
          <button
            :disabled="isLoading"
            :class="isLoading ? 'opacity-50' : ''"
            type="submit"
            class="bg-blue-800 border w-full text-center border-blue-800 p-4 text-white rounded-md text-xs font-bold h-12 flex justify-center items-center"
          >
            <div v-if="!isLoading">ENTRAR</div>
            <div v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ffffff"
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                />
                <path
                  fill="#ffffff"
                  d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
              </svg>
            </div>
          </button>
          <div
            class="text-xs text-blue-800 text-center"
            @click="navigateTo('/forgot')"
          >
            Esqueci minha senha
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
