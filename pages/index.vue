<script setup lang="ts">
import { ref } from "vue";
import { login } from "./../services/authService";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../stores/AuthStore";
import { Icon } from "@iconify/vue";

const authStore = useAuthStore();
const toast = useToast();

const email = ref("");
const password = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const lockIcon = "heroicons-outline:lock-closed";
const emailIcon = "iconamoon:email-thin";

const icons = {
  lockIcon,
  emailIcon
}

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
    <div class="loginwrapper">
      <div class="lg-inner-column">
        <div class="left-column relative z-[1]">
    <section
    ><img src="/assets/bg-birthday.jpg"/></section>
  </div>
    <section class="flex w-full sm:w-3/5 xl:w-4/12 lg:w-3/12 2xl justify-center items-center p-4">
      <div class="right-column relative">
        <div
          class="inner-content h-full flex flex-col bg-white dark:bg-slate-800"
        >
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-10 lg:hidden block">
                <img src="../public/assets/logo_BRT_blue.png" alt="" class="mx-auto h-24 mb-5" />
            </div>
            
      <div class="w-full max-w-sm">
        <div class="text-center 2xl:mb-10 mb-4">
          <h1 class="font-medium">Entrar</h1>
          <div class="text-slate-500 dark:text-slate-400 text-base">
            Faça login  para começar a usar o painel
            administrativo
          </div>
        </div>
      
        <form
          action=""
          @submit.prevent="handleLogin"
          class="flex flex-col gap-4"
        >


          <div class="mt-5">
            <label
              class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label" for="email"
              >E-mail </label
            >
            <div class="flex mt-2 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                class="bg-white  transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200  text-slate-400 text-base font-light h-full"
              >
              <Icon :icon="icons.emailIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                  type="text"
                  name="email"
                  id="email"
                  v-model="email"
                    placeholder="Digite um e-mail válido"
                    class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
                    rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <label
              class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
              >Senha</label
            >
            <div class="flex mt-2 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light  h-full"
                >
                <Icon :icon="icons.lockIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="password"
                    placeholder="Digite uma senha"
                    class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
                    rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <button
            :disabled="isLoading"
            :class="isLoading ? 'opacity-50' : ''"
            type="submit"
            class="mt-5 inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950  bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
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

      <div
      class="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
    ></div>
  </div>
</div>
</div>
    </section>
    </div>
  </div>
  </main>
</template>

<style scoped>
.loginwrapper {
  @apply flex w-full items-center overflow-hidden;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100vh;
  flex-basis: 100%;
  margin: 0; /* Adicione esta linha para garantir que não haja margens adicionais */
}

.lg-inner-column {
  @apply overflow-y-auto flex flex-wrap w-full items-center justify-center;
}

.left-column {
  @apply bg-slate-100 dark:bg-slate-900  lg:block hidden flex-1 overflow-hidden;
  h4 {
    @apply text-[40px] leading-[48px] text-slate-600 dark:text-slate-400;
  }
}

</style>
