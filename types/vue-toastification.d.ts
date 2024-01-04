import { ToastInterface } from "vue-toastification";

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $toast: ToastInterface;
  }

  interface Context {
    $toast: ToastInterface;
  }
}
