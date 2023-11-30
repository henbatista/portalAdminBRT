<script setup lang="ts">
import type { ListTenants } from "~/types/tenant";
import { useTenantStore } from "~/stores/TenantStore";
import { useMainStore } from "~/stores/MainStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { Icon } from "@iconify/vue";

const exchange = "material-symbols:question-exchange"

const icons = {
  exchange,
};

const sidebarStoreTenant = useSidebarStoreTenant();


const editTenant = (clientId: string) => {
  console.log('Editando o inquilino com o ID:', clientId);
  sidebarStoreTenant.sideBarActionTenant = true;
  sidebarStoreTenant.currentActionTenant = 'Tenants';
  tenantStore.idDeleteOrUpdate = clientId;
};

const tenantStore = useTenantStore();
const mainStore = useMainStore();

const props = defineProps<{
  tenants: ListTenants | null;
}>();

</script>

<template>
  <ModalConfirmation
    title="Deletar Banco"
    :deleteFunction="tenantStore.deleteTenant"
  />
  <div class="px-4 ">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto mb-3">
        <div class="flex items-center">
          <img
          src="/assets/social-care.gif"
          alt="Ícone de envio"
          class="w-10 h-10 mr-2"
        />
          <h1 class="text-xl font-semibold text-gray-900 -mb-0">Cliente</h1>
        </div>
        <p class="mt-2 text-sm text-gray-700">
          Adicione, Remova ou Edite um Cliente.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="
            sidebarStoreTenant.sideBarActionTenant = true;
            sidebarStoreTenant.currentActionTenant = 'Tenants';
          "
          type="button"
          class="inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950  bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        >
          Criar Novo Cliente
        </button>
      </div>
    </div>
    
    <div
      class="-mx-4 mt-10 ring-1 ring-gray-300 sm:-mx-6 shadow-md md:mx-0 md:rounded-lg"
    >
      <table class="min-w-full divide-y shadow-lg mb-10 divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Nome da empresa
            </th>
            <th
            scope="col"
            class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 bg-gray-50"
          >
            CNPJ
          </th>
            <th
              scope="col"
              class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
            >
              E-mail
            </th>
            <th
            scope="col"
            class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
          >
            Telefone
          </th>
          <th
          scope="col"
          class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
        >
          Tipo de empresa
        </th>
          <th
          scope="col"
          class="py-3.5 text-left text-sm font-semibold text-gray-900 bg-gray-50"
        >
          Ativo
        </th>
            <th
              scope="col"
              class="pr-5 py-3.5 text-right text-sm font-semibold text-gray-900 bg-gray-50"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tenant, index) in props.tenants" :key="index">
            <td
              :class="[
                index === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pl-4 text-sm text-left',
              ]"
            >
              {{ tenant.corporate_name }}
            </td>
            <td
            :class="[
              index === 0 ? '' : 'border-t border-gray-200',
              'relative py-4 pl-4 text-sm text-left',
            ]"
          >
            {{ tenant.cpf_cnpj }}
          </td>
            <td
              :class="[
                index === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-left',
              ]"
            >
              {{ tenant.email }}
            </td>
            <td
              :class="[
                index === 0 ? '' : 'border-t border-gray-200',
                'relative py-4  text-sm text-left',
              ]"
            >
              {{ tenant.phone }}
            </td>
            <td
            :class="[
              index === 0 ? '' : 'border-t border-gray-200',
              'relative py-4  text-sm text-left',
            ]"
          >
            {{ tenant.tenant_type }}
          </td>
            <td
            :class="[
              index === 0 ? '' : 'border-t border-gray-200',
              'relative py-4 text-sm text-left',
            ]"
          >
            <span
              class="w-4 h-4 rounded-full flex items-center ml-3 justify-center"
              :class="tenant.is_active ? 'bg-teal-600' : 'bg-red-500'"
            ></span>
          </td>
          
            <td
              :class="[
                index === 0 ? '' : 'border-t border-gray-200',
                'relative py-4 pr-5 text-sm flex justify-end gap-3',
              ]"
            >
            <button
            @click="
              //console.log('Delete button clicked for tenant:', tenant);
              mainStore.openDeleteModal = true;
              tenantStore.idDeleteOrUpdate = tenant.id;
            "
            class="text-red-600"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.45 4.06h-4.18v-.5a1.5 1.5 0 0 0-1.5-1.5h-3.54a1.5 1.5 0 0 0-1.5 1.5v.5H4.55a.5.5 0 0 0 0 1h.72l.42 14.45a2.493 2.493 0 0 0 2.5 2.43h7.62a2.493 2.493 0 0 0 2.5-2.43l.42-14.45h.72a.5.5 0 0 0 0-1Zm-9.72-.5a.5.5 0 0 1 .5-.5h3.54a.5.5 0 0 1 .5.5v.5H9.73Zm7.58 15.92a1.5 1.5 0 0 1-1.5 1.46H8.19a1.5 1.5 0 0 1-1.5-1.46L6.26 5.06h11.48Z"/><path fill="currentColor" d="M8.375 8a.5.5 0 0 1 1 0l.25 10a.5.5 0 0 1-1 0Zm7.25.007a.5.5 0 0 0-1 0l-.25 10a.5.5 0 0 0 1 0Z"/></svg>

              </button>
              <button
            
            
            class="text-lime-600"
          > 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="m19.71 8.04l-2.34 2.33l-3.75-3.75l2.34-2.33c.39-.39 1.04-.39 1.41 0l2.34 2.34c.39.37.39 1.02 0 1.41M3 17.25L13.06 7.18l3.75 3.75L6.75 21H3v-3.75M16.62 5.04l-1.54 1.54l2.34 2.34l1.54-1.54l-2.34-2.34M15.36 11L13 8.64l-9 9.02V20h2.34l9.02-9Z"/>
              </svg>
            </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
~/stores/tet