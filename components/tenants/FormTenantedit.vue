<script setup lang="ts">
import axios from 'axios';
import { ref, watch , onMounted } from 'vue';
import { useTenantStore } from "~/stores/TenantStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import type { Tenant } from '../../types/tenant';
import type { IForm }  from '../../types/newTenant'
import useApiUrl from '@/composables/useApiUrl';
import { Icon } from "@iconify/vue";
import { Switch } from '@headlessui/vue'

// Variável reativa para controlar o estado de 'is_active'
const is_active = ref(false)

// Assista a mudanças em 'is_active' e imprima o valor no console
watch(is_active, (newVal) => {
  // Atribuir 1 se is_active for true, 0 se for false
  const value = newVal ? 1 : 0;
  console.log(value); // Aqui você pode usar o valor conforme necessário
});

// Instâncias dos stores e do Toast
const sidebarStoreTenant = useSidebarStoreTenant();
const tenantStore = useTenantStore();
const toast = useToast();

// Função utilitária para obter a URL da API
const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

// Ícones usados no formulário
const company = "fluent:building-48-regular";
const userProfile = "carbon:user-profile"
const corporateNameIcon = "heroicons-outline:building-office";
const emailIcon = "iconamoon:email-thin";
const websiteIcon = "dashicons:admin-site-alt3";
const phoneIcon = "carbon:phone-ip";
const cellphoneIcon = "vaadin:mobile-retro";

const buttonHover = ref({
  isHovered: false,
});

// Manipuladores de eventos para lidar com o mouse sobre e fora do botão
const handleMouseOverButton = () => {
  buttonHover.value.isHovered = true;
};
const handleMouseOutButton = () => {
  buttonHover.value.isHovered = false;
};

const icons = {
  company,
  userProfile,
  corporateNameIcon,
  emailIcon,
  websiteIcon,
  phoneIcon,
  cellphoneIcon,
};

const form = reactive<IForm>({
  address: {
    city_name: '',
    street: '',
    street_add: '',
    district: '',
    zipcode: '',
    state_name: '',
    number: '1',
    street_number: '',
  },
  agency: {
    estimate_sales: 1,
    segment: 1,
    cellphone: '',
    corporate_name: '',
    cpf_cnpj: '',
    privacy_policy_accept: false,
    site: '', 
    name: '',
    phone: '',
    is_active: 1,
  },
  user: {
    cpf: '',
    password_confirmation: '',
    email_marketing_accept: false,
    email: '',
    password: '',
    how_did_you_meet: 8,
    name: '',
  },
  bank: {
    account_digit: '',
    bank_id: 0,
    client_name: '',
    account_number: '',
    account_type: '',
    agency: '',
    billing_email: '',
  },
});


const formTenant  = ref<Tenant>({
  id: "",
  slug_id: 0,
  tenant_type: "",
  logo: "",
  name: "",
  segment: 0,
  corporate_name: "",
  estimate_sales: 0,
  email: "",
  parent_id: "",
  phone: "",
  cellphone: "",
  cpf_cnpj: "",
  city_registration: "",
  state_registration: "",
  is_active: true,
  tenant_parent: "",
  bank_billing_email: "",
  site: "",
  privacy_policy_accept:false,
  privacy_policy_accepted_at: false,
});

function handleSubmit() {
  const {
    idDeleteOrUpdate,
  } = tenantStore;

  const isUpdate = idDeleteOrUpdate !== "";

  const saveOrUpdateTenant = isUpdate
    ? tenantStore.updateTenant
    : tenantStore.saveTenant;

  saveOrUpdateTenant(
    tenantStore.idDeleteOrUpdate,
    tenantStore.slug_id,
    formTenant.value.name,
    formTenant.value.corporate_name,
    formTenant.value.email,
    formTenant.value.phone,
    formTenant.value.cellphone,
    formTenant.value.cpf_cnpj,
    formTenant.value.is_active,
    formTenant.value.site,
    formTenant.value.bank_billing_email,
    formTenant.value.estimate_sales,
    formTenant.value.segment,
    formTenant.value.privacy_policy_accept,
    formTenant.value.privacy_policy_accepted_at,
    formTenant.value.parent_id,
    formTenant.value.tenant_type
  );

}



// AQUI É A FUNÇÃO PARA POPULAR O ESTIMATE SALES
type IEstimateSales = {
  id: number;
  estimate: string;
};

const estimateSales = ref<IEstimateSales[]>([]);
  const estimateHidden = ref('Até R$10.000,00');

watch(
  () => form.agency.estimate_sales,
  (newValue) => {
    // Atualizando o estado no PINIA;
    // Encontrar o objeto em howMeet que tem o mesmo ID que newValue
    const selectedItem = estimateSales.value.find((item) => item.id === newValue);
    if (selectedItem) {
      estimateHidden.value = selectedItem.estimate;
    } else {
      toast.error('ESTIMATE: ID não encontrado');
    }
  }
);

const getEstimateSales = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/estimate-sales/pluck`);
    estimateSales.value = response.data;
  } catch (error) {
    toast.error('API do ESTIMATE SALES fora do ar, entre em contato com a BRT!');
  }
};

// AQUI É A FUNÇÃO PARA POPULAR O HOW YOU MEET BRT
type IHowMeets = {
  id: number;
  how: string;
};

const howMeet = ref<IHowMeets[]>([]);


const getHowMeet = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/how-agency-meet-brt/pluck`);
    howMeet.value = response.data;
  } catch (error) {
    toast.error('API do HOW YOU MEET fora do ar, entre em contato com a BRT!');
  }
};

// AQUI FINALIZA A FUNÇÃO PARA POPULAR O HOW YOU MEET
// AQUI É A FUNÇÃO PARA POPULAR O SEGMENTS
type ISegments = {
  id: number;
  segment: string;
};

const segments = ref<ISegments[]>([]);
const segmentsHidden = ref('Lazer (Operadora)');

const getSegments = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/agency-segments/pluck`);
    segments.value = response.data;
  } catch (error) {
    toast.error('API do SEGMENTS fora do ar, entre em contato com a BRT!');
  }
};

// CHAMANDO AS FUNÇÕES PARA POPULAR OS DROPDOWNS
onMounted(async () => {
  getEstimateSales();
  getHowMeet();
  getSegments();
});

// ESSA CONTS ABAIXO DIZ QUAIS DOS CAMPOS SÃO OPCIONAIS
const optionalFields = ['street_add', 'phone', 'site'];

// FUNÇÃO PARA VERIFICAR SE TODOS OS CAMPOS FORAM PREENCHIDOS
const isFormEmpty = computed(() => {
  const isFormDataEmpty = Object.entries(formTenant).some(([key, subObj]) =>
    Object.entries(subObj).some(([fieldKey, fieldVal]) => fieldVal === '' && !optionalFields.includes(fieldKey))
  );

  // const isDocsEmpty = Object.values(docs).some((docArray) => docArray.length === 0);
  const isPrivacyPolicyNotAccepted = !form.agency.privacy_policy_accept;
  const isNameShort = form.user.name.length < 3;
  const isCorporateNameShort = formTenant.value.corporate_name.length < 5;

  return (
    isFormDataEmpty ||
    isPrivacyPolicyNotAccepted ||
    isNameShort ||
    isCorporateNameShort
  );
});

const showMinLengthWarning = reactive({
  name: false,
  corporate_name: false,
});

const checkMinLength = (field: string, minLength: number) => {
  switch (field) {
    case 'name':
      showMinLengthWarning.name = formTenant.value.name.length < minLength;
      break;
    case 'corporate_name':
      showMinLengthWarning.corporate_name = formTenant.value.corporate_name.length < minLength;
      break;
    default:
      break;
  }
};

onMounted(() => {
    const tenantExist = tenantStore.tenants?.find(tenant => tenant.id === tenantStore.idDeleteOrUpdate)
    if (tenantExist) {
      formTenant.value.name = tenantExist.name
      formTenant.value.corporate_name = tenantExist.corporate_name
      formTenant.value.email = tenantExist.email
      formTenant.value.phone = tenantExist.phone
      formTenant.value.cellphone = tenantExist.cellphone
      formTenant.value.cpf_cnpj = tenantExist.cpf_cnpj
      formTenant.value.site = tenantExist.site
      formTenant.value.bank_billing_email = tenantExist.bank_billing_email
      formTenant.value.estimate_sales = tenantExist.estimate_sales
      formTenant.value.segment = tenantExist.segment
      formTenant.value.is_active = tenantExist.is_active
    }
})

</script>
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 px-6">
    <div class="bg-slate-50 justify-center  -mx-6 px-2 py-6">
      <div class="flex justify-between  mb-2">
        <div class="ml-6 grid   text-slate-900 lg:grid-cols-1 grid-cols-1">
          <span
          class="flex items-center md:text-xl gap-2  font-semibold text-lg"
          v-if='tenantStore.idDeleteOrUpdate === ""'
        >    <Icon class="-mt-0.5" :icon="icons.company" />
        Adicionar dados da empresa</span
        >
        <span  class="flex items-center md:text-xl gap-2  font-semibold text-lg" v-else>
          <Icon class="-mt-0.5" :icon="icons.company" />
          Atualizar dados da empresa</span
        >
          <div class="flex-1 md:text-base text-xs"> 
            Preencha os dados para cadastrar um novo Estado.
          </div>
        </div>
        <button @click="sidebarStoreTenant.sideBarActionTenant = false">
          <svg
          class="mr-7"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.03 0 1.42c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 0 0 0-1.41l-6.58-6.6a.996.996 0 1 0-1.41 1.41L16.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"
            />
          </svg>
        </button>
      </div>
  
  
      </div>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">

      <div>
        <label class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label">
          Nome Fantasia
        </label>
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span class="bg-white  transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full">
              <Icon :icon="icons.corporateNameIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input 
              v-model="formTenant.name"
              name="vi_Fullname"
              type="text"
              placeholder="Nome da empresa"
              class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"            />
            </div>
          </div>
        </div>
      </div>

      <div >
          <label
            class="flex-0 md:w-[100px] w-[60px]"
          >
            Razão Social</label
          >
          <div class="flex mt-2 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
              >
                <Icon :icon="icons.corporateNameIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                  v-model="formTenant.corporate_name"

                  @blur="checkMinLength('name', 3)"
                  :class="[
                      '    block w-full sm:text-sm rounded-md',
                      showMinLengthWarning['corporate_name'] ? 'border-red-600' : 'focus:border-slate-600  border-gray-300',
                    ]"
    
                  name="vi_Fullname"
                  type="text"
                  placeholder="Nome da empresa"
                  class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
    
                  rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]" />
                  <div v-if="showMinLengthWarning['corporate_name']" class="text-[10px] mt-1 ml-1 text-red-600">
                    Este campo precisa ter no mínimo 5 caracteres.
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div >
          <label
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label" for="email"
            >E-mail para Login na Plataforma</label
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
                v-model="formTenant.email"
                  placeholder="Digite um e-mail válido"
                  class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
                  rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div  >
          <label
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label" for="phone"
          >
            Telefone Fixo</label
          >
          <div class="flex mt-2 items-stretch">
            <span class="flex-none input-group-addon">
              <span
              class="bg-white  transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200  text-slate-400 text-base font-light h-full"
              >
                <Icon :icon="icons.phoneIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                type="text"
                name="agency-phone"
                id="agency-phone"
                v-maska
                data-maska="(##) #####-####"
                v-model="formTenant.phone"
                  placeholder="Digite o número de telefone celular"
                  class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
                  rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"              />
              </div>
            </div>
          </div>
        </div>

        
    <div >
      <label
        class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label" for="last-name" 
      >
        Telefone Celular</label
      >
      <div class="flex mt-1 items-stretch">
        <span class="flex-none input-group-addon">
          <span
          class="bg-white  transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
          >
            <Icon :icon="icons.cellphoneIcon" />
          </span>
        </span>
        <div class="flex-1">
          <div class="relative fromGroup2">
            <input
            type="text"
            v-maska
            data-maska="(##) #####-####"
            name="agency-cellphone"
            id="agency-cellphone"
            v-model="formTenant.cellphone"
              placeholder="Digite o número do Celular"
              class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
              rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"              />
          </div>
        </div>
      </div>
    </div>

    <div>
      <label class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label" for="cnpj">CNPJ</label>
      <div class="flex mt-1 items-stretch">
  <span class="flex-none input-group-addon">
    <span
    class="bg-white  transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
    >
      <Icon :icon="icons.emailIcon" />
    </span>
  </span>
  <div class="flex-1">
    <div class="relative fromGroup2">
      <input
      type="text"
      name="cnpj"
      v-maska
      data-maska="##.###.###/####-##"
      id="cnpj"
      v-model="formTenant.cpf_cnpj"
        placeholder="Digite o nome da empresa"
        class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"              />
    </div>
  </div>
</div>
</div>


<div >
  <label
    class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
  >
    Website</label
  >
  <div class="flex mt-2 items-stretch">
    <span class="flex-none input-group-addon">
      <span
      class="bg-white  transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
      >
        <Icon :icon="icons.websiteIcon" />
      </span>
    </span>
    <div class="flex-1">
      <div class="relative fromGroup2">
        <input
        type="text"
        name="website"
        id="website"
        v-model="formTenant.site"
        placeholder="Digite a URL do site"
        class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"              />
      </div>
    </div>
  </div>
</div>

            <!-- E-mail para Recebimento das Faturas< -->
            <div >
              <label
                class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
                >E-mail para Recebimento das Faturas</label
              >
              <div class="flex mt-2 items-stretch">
                <span class="flex-none input-group-addon">
                  <span
                    class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200  text-slate-400 text-base font-light  h-full"
                  >
                    <Icon :icon="icons.emailIcon" />
                  </span>
                </span>
                <div class="flex-1">
                  <div class="relative fromGroup2">
                    <input
                    type="text"
                    name="cobrar-email"
                    id="cobrar-email"
                    v-model="form.bank.billing_email"
                      placeholder="Digite um e-mail válido"
  
                      class="bg-white  transition duration-300 ease-in-out border border-slate-200  focus:ring-0  
                      rounded placeholder:text-slate-400 text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600   block w-full focus:outline-none h-[40px]"
                    />
                  </div>
                </div>
              </div>
            </div>
                    

  </div>

  <div class="grid gap-5 text-slate-900  md:grid-cols-3 grid-cols-1 mb-2">
    <div>
    <div class="sm:col-span-3 mt-1"> 
      <label for="type-account" class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label">Tipo de Conta
      </label>
      <div class="mt-2 mb-4">
        <select
        id="type-account"
        name="type-account"
        v-model="form.bank.account_type"
          autocomplete="type-account"
          class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0  focus:outline-none  
         text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600 "
        >
        <option value="Pessoa Júridica">Pessoa Júridica</option>
        <option value="Pessoa Física">Pessoa Física</option>             
       </select>
      </div>
    </div>
  </div>
  <div>
    <div class="sm:col-span-3 md:mt-2 -mt-4">
      <label for="street-address" class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label">
        Estimativa de Vendas Mensais
      </label>
      <div class="mt-1" v-if="estimateSales && estimateSales.length > 0">
        <select
        id="agency-estimates"
        name="agency-estimates"
        v-model="form.agency.estimate_sales"
        class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0  focus:outline-none  
         text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600 "
      >
      <option v-for="sales in estimateSales as any" :key="sales.id" :value="sales.id">
        {{ sales.estimate }}
      </option>
    </select>
      </div>
    </div>
  </div>
  <div>
    <div class="sm:col-span-3 md:mt-1 -mt-4"  v-if="segments && segments.length > 0">
     <label for="segment" class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label">Segmento da sua agência
     </label>
     <div class="mt-2 mb-4">
       <select
       id="segment"
       name="segment"
         autocomplete="segment"
         class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0  focus:outline-none  
        text-slate-900 text-sm px-3  placeholder:font-light focus:border-slate-600 "
        v-model="formTenant.segment"
       >
       <option v-for="segment in segments as any" :key="segment.id" :value="segment.id">
         {{ segment.segment }}
       </option>
       </select>
     </div>
   </div>
 </div>
 <div >
  <div class="grid gap-1 text-slate-900 md:grid-cols-1 grid-cols-1 mb-2">
  <label >Manter usuário ativo? </label>
  <Switch
  v-model="formTenant.is_active"
  :class="is_active ? 'bg-sky-800' : 'bg-slate-600'"
  class="relative inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
>
    <span class="sr-only text-cyan-300"></span>
    <span
      aria-hidden="true"
      :class="formTenant.is_active ? 'translate-x-4' : '-translate-x-0.5'"
      class="pointer-events-none inline-block h-[18px] -mt-0.5 w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
    />
  </Switch>
</div>
</div>
  </div>

  <div class="mt-6">
    <fieldset>
      <div class="mt-4 space-y-4">
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              v-model="formTenant.privacy_policy_accept"
              class="focus:ring-slate-800 h-4 w-4 text-slate-900 border-gray-300 rounded"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-gray-700"
              >Ao enviar os dados concordo com a
              <span class="text-blue-800 underline font-bold cursor-pointer" 
                >política de privacidade</span
              ></label
            >
          </div>
        </div>

      </div>
    </fieldset>
  </div>


    <div class="pt-5">
      <div class="flex justify-end gap-1">
        <button
        type="submit"
        @mouseover="handleMouseOverButton"
        @mouseout="handleMouseOutButton"
        :class="!tenantStore.isLoading ? '' : 'opacity-50'"
        class="inline-flex mt-5 transition-all  duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950  bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
      >
        <div v-if="!tenantStore.isLoading" class="flex justify-center gap-5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M11 13H6q-.425 0-.713-.288T5 12q0-.425.288-.713T6 11h5V6q0-.425.288-.713T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.713-.288T11 18v-5Z"
            />
          </svg>
          <span v-if='tenantStore.idDeleteOrUpdate === ""'>ADICIONAR BANCO</span
          ><span v-else>ATUALIZAR BANCO</span>
        </div>
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
      </div>

      <div class="text-[10px] 1 ml-1 text-red-600 text-right mr-4 mt-1" v-if="isFormEmpty">
        Você possui campos em branco ou inválidos!
      </div>

    </div>
    <!-- CAMPOS ESCONDIDOS PARA RDSTATION -->
    <div>

      <input
        type="hidden"
        name="estimate-hidden"
        id="estimate-hidden"
        v-model="estimateHidden"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
      <input
        type="hidden"
        name="segments-hidden"
        id="segments-hidden"
        v-model="segmentsHidden"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />

    </div>
  </form>
</template>
<style lang="scss" scoped>
.btn-outline-dark {
  @apply bg-transparent text-slate-900     hover:bg-slate-900 hover:bg-opacity-5;
  &.active {
    @apply bg-slate-900 text-white dark:bg-slate-900 dark:text-slate-300;
  }
}

.custom-span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  transition: background-color 0.3s ease, transform 0.5s ease; 

}

/* Cor padrão quando o plano de fundo é teal */
.bg-teal-600 {
  background-color: #319795;
}

/* Cor padrão quando o plano de fundo é vermelho */
.bg-red-500 {
  background-color: #e53e3e;
}

/* Tonalidade mais clara de vermelho quando o plano de fundo é vermelho */
.custom-span.bg-red-500:hover {
  background-color: #fc8181;
  transform: scale(1.2); /* Aumenta em 20% durante o hover */

}

/* Cor durante a interação quando o plano de fundo é teal */
.custom-span.bg-teal-600:hover {
  background-color: #4fd1c5;
  transform: scale(1.2); /* Aumenta em 20% durante o hover */

}

#button:hover{
  transform: scale(1.1);
}

button:hover {
  transform: scale(1.1);
}

</style>