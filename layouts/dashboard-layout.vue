<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { BellIcon, CheckIcon, HomeIcon } from "@heroicons/vue/20/solid";
import { useSidebarStore } from "../stores/SidebarStore";
import { useSidebarStoreTenant } from "../stores/SidebarStoreTenant";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { Icon } from "@iconify/vue";

const menuIcon = "line-md:menu-fold-right";
const closeIcon = "line-md:menu-fold-left";

const icons = {
  menuIcon,
  closeIcon,
  aiportIcon:
    "streamline:travel-airport-take-off-travel-plane-adventure-airplane-take-off",
};

const toast = useToast();
const sidebarStore = useSidebarStore();
const sidebarStoreTenant = useSidebarStoreTenant();

type NavigationItem = {
  name: string;
  href: string;
  icon: any; // "any" pode ser substituído pelo tipo específico do ícone, se conhecido.
  current: boolean;
};

type UserNavigationItem = {
  name: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { name: "Clientes", href: "/tenants", icon: CheckIcon, current: true },
  { name: "Usuários", href: "/users", icon: HomeIcon, current: true },
  { name: "Câmbio", href: "/exchanges", icon: HomeIcon, current: true },
  { name: "Bancos", href: "/banks", icon: HomeIcon, current: true },
  { name: "Markups", href: "/markups", icon: HomeIcon, current: true },
  { name: "País", href: "/countries", icon: HomeIcon, current: true },
  { name: "Estados", href: "/states", icon: HomeIcon, current: true },
  { name: "Cidades", href: "/cities", icon: HomeIcon, current: true },
  {
    name: "Aeroportos",
    href: "/airports",
    icon: HomeIcon,
    current: true,
  },
  {
    name: "Hotéis Recomendados",
    href: "/recommendedhotels",
    icon: HomeIcon,
    current: true,
  },
];

const userNavigation: UserNavigationItem[] = [
  { name: "Meu Perfil", href: "#" },
  { name: "Logout", href: "#" }, // Adicionado item de logout
];

const router = useRouter();

const logout = () => {
  localStorage.removeItem("authStore"); // Remove a informação de autenticação
  router.push("/"); // Redireciona para a página de login
  toast.success("Logout realizado com sucesso!");
};

const sidebarOpen = ref(false);

const closeSidebar = () => {
  sidebarStore.sideBarAction = false;
};

const closeSidebarTenant = () => {
  sidebarStoreTenant.sideBarActionTenant = false;
};
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-slate-900"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <Icon :icon="icons.closeIcon" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex justify-center items-center px-1">
              <img
                class="h-28 w-auto"
                src="/assets/logo_BRT_white.png"
                alt="Workflow"
              />
            </div>
            <div class="mt-2 flex-1 h-0 overflow-y-auto">
              <nav class="px-5 space-y-1">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current
                      ? 'bg-slate-800 text-white'
                      : 'text-indigo-100 hover:bg-slate-600',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="mr-4 flex-shrink-0 h-6 w-6 text-slate-300"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col justify-center flex-grow pt-2 bg-slate-900 overflow-y-auto"
      >
        <div class="flex items-center justify-center flex-shrink-0 px-2">
          <img
            class="h-32 w-auto"
            src="/assets/logo_BRT_white.png"
            alt="Workflow"
          />
        </div>
        <div class="mt-2 flex-1 flex px-2 flex-col">
          <nav class="flex-1 px-2 pb-2 space-y-1">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-slate-800 text-white'
                  : 'text-indigo-100 hover:bg-slate-600',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
            >
              <component
                :is="item.icon"
                class="mr-3 flex-shrink-0 h-6 w-6 text-white"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Icon :icon="icons.menuIcon" />
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex"></div>
          <div class="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      @click="item.name === 'Logout' ? logout() : null"
                      >{{ item.name }}</a
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main>
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
    <!-- SIDE BAR DE MENU GENERAL -->
    <Transition name="slide-fade">
      <section
        v-if="sidebarStore.sideBarAction"
        id="side-bar"
        class="p-0 overflow-y-auto overflow-x-hidden w-full md:w-[500px] right-0 fixed bg-white sidebar z-50 top-0"
      >
        <FormExchanges v-if="sidebarStore.currentAction === 'Exchanges'" />
        <FormBanks v-if="sidebarStore.currentAction === 'Banks'" />
        <FormCountry v-if="sidebarStore.currentAction === 'Countries'" />
        <FormStates v-if="sidebarStore.currentAction === 'States'" />
        <FormUsers v-if="sidebarStore.currentAction === 'Users'" />
        <FormCities v-if="sidebarStore.currentAction === 'Cities'" />
        <FormRecommendedHotel
          v-if="sidebarStore.currentAction === 'Recommended'"
        />
      </section>
    </Transition>
    <section
      @click="closeSidebar()"
      class="bg-sidebar"
      :class="sidebarStore.sideBarAction ? 'active' : ''"
    ></section>

    <Transition name="slide-fade-tenant">
      <section
        v-if="sidebarStoreTenant.sideBarActionTenant"
        id="side-bar"
        class="p-0 overflow-y-auto overflow-x-hidden md:w-[60rem] w-30 right-0 fixed bg-white sidebar z-50 top-0"
      >
        <FormTenant
          v-if="sidebarStoreTenant.currentActionTenant === 'Tenants'"
        />
        <FormTenantedit
          v-if="sidebarStoreTenant.currentActionTenant === 'TenantsEdit'"
        />
        <FormUsers v-if="sidebarStoreTenant.currentActionTenant === 'Users'" />
        <FormMarkup
          v-if="sidebarStoreTenant.currentActionTenant === 'Markups'"
        />
        <FormAiports
          v-if="sidebarStoreTenant.currentActionTenant === 'Airports'"
        />
      </section>
    </Transition>

    <section
      @click="closeSidebarTenant()"
      class="bg-sidebar"
      :class="sidebarStoreTenant.sideBarActionTenant ? 'active' : ''"
    ></section>
  </div>
</template>

<style scooped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-tenant-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-tenant-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(500px);
}

.slide-fade-tenant-enter-from,
.slide-fade-tenant-leave-to {
  transform: translateX(60rem);
}

.sidebar {
  height: 100%;
  z-index: 99;
}

.bg-sidebar {
  width: 100vw;
  height: 100vh;
  transition: opacity 0.3s;
  background-color: rgb(0, 0, 0);
  position: fixed;
  opacity: 0;
  z-index: 98;
  top: 0;
  pointer-events: none;
}
.bg-sidebar.active {
  opacity: 0.5;
  pointer-events: auto;
}
</style>
