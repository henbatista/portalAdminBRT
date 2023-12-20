<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reactive } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import type { IForm } from "../../types/newTenant";
import useApiUrl from "@/composables/useApiUrl";
import { Icon } from "@iconify/vue";
import { useTenantStore } from "~/stores/TenantStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";

const toast = useToast();
const sidebarStoreTenant = useSidebarStoreTenant();
const tenantStore = useTenantStore();

const lockIcon = "heroicons-outline:lock-closed";
const company = "fluent:building-48-regular";
const bankIcon = "guidance:bank";
const sendFile = "solar:file-send-outline";
const sendFileinput = "solar:file-send-line-duotone";
const userProfile = "carbon:user-profile";
const myIcon = "mdi:home";
const cepIcon = "solar:streets-map-point-linear";
const complementoIcon = "bi:buildings";
const bairroIcon = "solar:streets-navigation-linear";
const numberIcon = "octicon:number-24";
const cityIcon = "healthicons:city-outline";
const addressIcon = "fluent:real-estate-20-regular";
const corporateNameIcon = "heroicons-outline:building-office";
const emailIcon = "iconamoon:email-thin";
const websiteIcon = "dashicons:admin-site-alt3";
const phoneIcon = "carbon:phone-ip";
const cellphoneIcon = "vaadin:mobile-retro";
const agencyIcon = "mdi-light:credit-card";
const avatarIcon = "fa:user-o";
const cpfIcon = "solar:user-id-linear";

const icons = {
  company,
  bankIcon,
  userProfile,
  sendFile,
  sendFileinput,
  myIcon,
  cepIcon,
  complementoIcon,
  bairroIcon,
  numberIcon,
  cityIcon,
  addressIcon,
  corporateNameIcon,
  emailIcon,
  websiteIcon,
  phoneIcon,
  cellphoneIcon,
  agencyIcon,
  avatarIcon,
  cpfIcon,
  lockIcon,
};

// Necessário para pegar o BANCO CORRETAMENTE
const bankHidden = ref("");
const props = defineProps(["clientId"]); // Recebendo clientId como propriedade
const isLoading = ref(false);

const isEditMode = reactive({ value: false });

onMounted(async () => {
  if (props.clientId) {
    isEditMode.value = true;
  } else {
    isEditMode.value = false;
  }
});

const form = reactive<IForm>({
  address: {
    city_name: "",
    street: "",
    street_add: "",
    district: "",
    zipcode: "",
    state_name: "",
    number: "1",
    street_number: "",
  },
  agency: {
    estimate_sales: 1,
    segment: 1,
    cellphone: "",
    corporate_name: "",
    cpf_cnpj: "",
    privacy_policy_accept: false,
    site: "",
    name: "",
    phone: "",
    is_active: 1,
    parent_id: "",
    tenant_type: "",
  },
  user: {
    cpf: "",
    password_confirmation: "",
    email_marketing_accept: false,
    email: "",
    password: "",
    how_did_you_meet: 8,
    name: "",
  },
  bank: {
    account_digit: "",
    bank_id: 0,
    client_name: "",
    account_number: "",
    account_type: "",
    agency: "",
    billing_email: "",
  },
});

// AQUI É A FUNÇÃO PARA POPULAR O ESTIMATE SALES
type IEstimateSales = {
  id: number;
  estimate: string;
};

const estimateSales = ref<IEstimateSales[]>([]);
const estimateHidden = ref("Até R$10.000,00");

watch(
  () => form.agency.estimate_sales,
  (newValue) => {
    // Atualizando o estado no PINIA;
    // Encontrar o objeto em howMeet que tem o mesmo ID que newValue
    const selectedItem = estimateSales.value.find(
      (item) => item.id === newValue,
    );
    if (selectedItem) {
      estimateHidden.value = selectedItem.estimate;
    } else {
      toast.error("ESTIMATE: ID não encontrado");
    }
  },
);

const getEstimateSales = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/estimate-sales/pluck`);
    estimateSales.value = response.data;
  } catch (error) {
    toast.error(
      "API do ESTIMATE SALES fora do ar, entre em contato com a BRT!",
    );
  }
};

// AQUI É A FUNÇÃO PARA POPULAR O HOW YOU MEET BRT
type IHowMeets = {
  id: number;
  how: string;
};

const howMeet = ref<IHowMeets[]>([]);
const howYouMeetHidden = ref("Blogs");

watch(
  () => form.user.how_did_you_meet,
  (newValue) => {
    // Atualizando o estado no PINIA;
    // Encontrar o objeto em howMeet que tem o mesmo ID que newValue
    const selectedItem = howMeet.value.find((item) => item.id === newValue);
    if (selectedItem) {
      howYouMeetHidden.value = selectedItem.how;
    } else {
      toast.error("HOW MEET: ID não encontrado");
    }
  },
);

const getHowMeet = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/how-agency-meet-brt/pluck`,
    );
    howMeet.value = response.data;
  } catch (error) {
    toast.error("API do HOW YOU MEET fora do ar, entre em contato com a BRT!");
  }
};

// AQUI FINALIZA A FUNÇÃO PARA POPULAR O HOW YOU MEET
// AQUI É A FUNÇÃO PARA POPULAR O SEGMENTS
type ISegments = {
  id: number;
  segment: string;
};

const { address, agency, user, bank } = toRefs(form);

const { getApiUrl } = useApiUrl();
const apiUrl = getApiUrl();

const segments = ref<ISegments[]>([]);
const segmentsHidden = ref("Lazer (Operadora)");
watch(
  () => form.agency.segment,
  (newValue) => {
    // Atualizando o estado no PINIA;

    // Encontrar o objeto em howMeet que tem o mesmo ID que newValue
    const selectedItem = segments.value.find((item) => item.id === newValue);
    if (selectedItem) {
      segmentsHidden.value = selectedItem.segment;
    } else {
      toast.error("HOW MEET: ID não encontrado");
    }
  },
);

const updateBankId = (newBankId: any, bankName: string) => {
  form.bank.bank_id = newBankId;
  bankHidden.value = bankName;
};

const getSegments = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/agency-segments/pluck`);
    segments.value = response.data;
  } catch (error) {
    toast.error("API do SEGMENTS fora do ar, entre em contato com a BRT!");
  }
};

// CHAMANDO AS FUNÇÕES PARA POPULAR OS DROPDOWNS
onMounted(async () => {
  getEstimateSales();
  getHowMeet();
  getSegments();
});

let debounceTimer: NodeJS.Timeout;

const checkCEP = async () => {
  // Limpa o timer existente, se houver
  clearTimeout(debounceTimer);

  // Inicia um novo timer
  debounceTimer = setTimeout(async () => {
    if (form.address.zipcode.length === 9) {
      const cep = form.address.zipcode.replace("-", "");
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`,
        );
        if (response.data.erro === true) {
          toast.error("Nenhum CEP encontrado. Digite novamente!");
          form.address.zipcode = "";
          const element = document.getElementById("agency-zipcode");
          if (element) {
            element.focus();
          }
          return;
        }
        form.address.street = response.data.logradouro;
        form.address.district = response.data.bairro;
        form.address.city_name = response.data.localidade;
        form.address.state_name = response.data.uf;
      } catch (error) {
        toast.error("API do CEP fora do ar, entre em contato com a BRT!");
      }
    }
  }, 300); // 300 milissegundos de espera
};

const submitForm = async () => {
  const formJson = JSON.stringify(form);
  const FormDataNew = new FormData();
  FormDataNew.append("form", formJson);
  if (docContract1.value instanceof File) {
    FormDataNew.append("contract", docContract1.value);
  }
  if (docAddress1.value instanceof File) {
    FormDataNew.append("address", docAddress1.value);
  }
  if (docSocio1.value instanceof File) {
    FormDataNew.append("socio1", docSocio1.value);
  }
  if (docSocio1verso.value instanceof File) {
    FormDataNew.append("socio1verso", docSocio1verso.value);
  }
  if (docSocio1address.value instanceof File) {
    FormDataNew.append("socio1address", docSocio1address.value);
  }
  if (docSocio2.value instanceof File) {
    FormDataNew.append("socio2", docSocio2.value);
  }
  if (docSocio2verso.value instanceof File) {
    FormDataNew.append("socio2verso", docSocio2verso.value);
  }
  if (docSocio2address.value instanceof File) {
    FormDataNew.append("socio2address", docSocio2address.value);
  }
  if (docSocio3.value instanceof File) {
    FormDataNew.append("socio3", docSocio3.value);
  }
  if (docSocio3verso.value instanceof File) {
    FormDataNew.append("socio3verso", docSocio3verso.value);
  }
  if (docSocio3address.value instanceof File) {
    FormDataNew.append("socio3address", docSocio3address.value);
  }
  if (docLogo.value instanceof File) {
    FormDataNew.append("logo", docLogo.value);
  }
  tenantStore.isLoading = true;
  try {
    if (isEditMode.value) {
      // Se está em modo de edição, faça uma chamada PUT para atualizar os dados
      isLoading.value = true;
      const { data } = await axios.put(
        `${apiUrl}/api/v1/tenants/${props.clientId}`,
        FormDataNew,
      );

      if (data.success === true) {
        tenantStore.getAllTenants; // Chama o getAllTenants para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        toast.success("Cadastro efetuado com sucesso!", {
          onClose: () => {
            navigateTo("/tenants");
          },
        });
      }
    } else {
      // Se não está em modo de edição, faça uma chamada POST para criar um novo cliente
      tenantStore.isLoading = true;
      const { data } = await axios.post(
        `${apiUrl}/api/v1/client/create`,
        FormDataNew,
      );
      if (data.success === true) {
        tenantStore.getAllTenants; // Chama o getAllTenants para atualizar a tabela!
        sidebarStoreTenant.sideBarActionTenant = false;
        toast.success("Cadastro efetuado com sucesso!", {
          onClose: () => {
            navigateTo("/tenants");
          },
        });
      }
    }
  } catch (error: any) {
    error.response && error.response.data && error.response.data.errors;
  } finally {
    // Após a conclusão, independente de sucesso ou erro, defina isLoading como false
    tenantStore.isLoading = false;
  }
};

// ESSA CONTS ABAIXO DIZ QUAIS DOS CAMPOS SÃO OPCIONAIS
const optionalFields = ["street_add", "phone", "site"];
const passwordDifferent = ref(false);

// FUNÇÃO PARA VERIFICAR SE TODOS OS CAMPOS FORAM PREENCHIDOS
const isFormEmpty = computed(() => {
  const isFormDataEmpty = Object.entries(form).some(([key, subObj]) =>
    Object.entries(subObj).some(
      ([fieldKey, fieldVal]) =>
        fieldVal === "" && !optionalFields.includes(fieldKey),
    ),
  );

  // const isDocsEmpty = Object.values(docs).some((docArray) => docArray.length === 0);
  const isPrivacyPolicyNotAccepted = !form.agency.privacy_policy_accept;
  const isNameShort = form.agency.name.length < 3;
  const isCorporateNameShort = form.agency.corporate_name.length < 5;
  const isPasswordShort = form.user.password.length < 6;
  const isPasswordEqualConfirmation =
    form.user.password === form.user.password_confirmation;
  const isFilesDocsEmpty =
    docSocio1.value === null ||
    docAddress1.value === null ||
    docContract1.value === null;

  return (
    isFormDataEmpty ||
    // isDocsEmpty ||
    isPrivacyPolicyNotAccepted ||
    isNameShort ||
    isCorporateNameShort ||
    isPasswordShort ||
    !isPasswordEqualConfirmation ||
    isFilesDocsEmpty // note o sinal de negação
  );
});

const showMinLengthWarning = reactive({
  name: false,
  corporate_name: false,
  password: false,
  password_confirmation: false,
});

const checkMinLength = (field: string, minLength: number) => {
  switch (field) {
    case "name":
      showMinLengthWarning.name = form.agency.name.length < minLength;
      break;
    case "corporate_name":
      showMinLengthWarning.corporate_name =
        form.agency.corporate_name.length < minLength;
      break;
    case "password":
      showMinLengthWarning.password = form.user.password.length < minLength;
      break;
    case "password_confirmation":
      showMinLengthWarning.password_confirmation =
        form.user.password_confirmation.length < minLength;
      passwordDifferent.value =
        form.user.password !== form.user.password_confirmation;
      break;
    default:
      break;
  }
};

// ============================================================= //
// A lógica abaixo é para manipular todoso os FILE INPUTS
// ============================================================= //
const docSocio1 = ref<File | null>(null);
const docSocio2 = ref<File | null>(null);
const docSocio3 = ref<File | null>(null);
const docSocio1verso = ref<File | null>(null);
const docSocio2verso = ref<File | null>(null);
const docSocio3verso = ref<File | null>(null);
const docSocio1address = ref<File | null>(null);
const docSocio2address = ref<File | null>(null);
const docSocio3address = ref<File | null>(null);
const docAddress1 = ref<File | null>(null);
const docContract1 = ref<File | null>(null);
const docLogo = ref<File | null>(null);

const fileNamesNew = ref({
  docSocio1: "",
  docSocio2: "",
  docSocio3: "",
  docSocio1verso: "",
  docSocio2verso: "",
  docSocio3verso: "",
  docSocio1address: "",
  docSocio2address: "",
  docSocio3address: "",
  docAddress1: "",
  docContract1: "",
  docLogo: "",
});

// Para acionar o input de arquivo programaticamente
const input1 = ref<HTMLInputElement | null>(null);
const input2 = ref<HTMLInputElement | null>(null);
const input3 = ref<HTMLInputElement | null>(null);
const input4 = ref<HTMLInputElement | null>(null);
const input5 = ref<HTMLInputElement | null>(null);
const input6 = ref<HTMLInputElement | null>(null);
const input7 = ref<HTMLInputElement | null>(null);
const input8 = ref<HTMLInputElement | null>(null);
const input9 = ref<HTMLInputElement | null>(null);
const input10 = ref<HTMLInputElement | null>(null);
const input11 = ref<HTMLInputElement | null>(null);
const input12 = ref<HTMLInputElement | null>(null);

const inputMap: Record<string, Ref<HTMLInputElement | null>> = {
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  input7,
  input8,
  input9,
  input10,
  input11,
  input12,
};

const triggerFileInput = (key: string) => {
  (inputMap[key] as Ref<HTMLInputElement | null>)?.value?.click();
};

const updateTenantId = (TenantName: string, newTenantId: any) => {
  agency.value.parent_id = newTenantId;
};

const handleFileChangeNovo = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    if (input.id === "docContract1") {
      fileNamesNew.value.docContract1 = input.files[0].name;
      docContract1.value = input.files[0];
    }
    if (input.id === "docAddress1") {
      fileNamesNew.value.docAddress1 = input.files[0].name;
      docAddress1.value = input.files[0];
    }
    if (input.id === "docSocio1") {
      fileNamesNew.value.docSocio1 = input.files[0].name;
      docSocio1.value = input.files[0];
    }
    if (input.id === "docSocio1verso") {
      fileNamesNew.value.docSocio1verso = input.files[0].name;
      docSocio1verso.value = input.files[0];
    }
    if (input.id === "docSocio1address") {
      fileNamesNew.value.docSocio1address = input.files[0].name;
      docSocio1address.value = input.files[0];
    }

    if (input.id === "docSocio2") {
      fileNamesNew.value.docSocio2 = input.files[0].name;
      docSocio2.value = input.files[0];
    }
    if (input.id === "docSocio2verso") {
      fileNamesNew.value.docSocio2verso = input.files[0].name;
      docSocio2verso.value = input.files[0];
    }
    if (input.id === "docSocio2address") {
      fileNamesNew.value.docSocio2address = input.files[0].name;
      docSocio2address.value = input.files[0];
    }

    if (input.id === "docSocio3") {
      fileNamesNew.value.docSocio3 = input.files[0].name;
      docSocio3.value = input.files[0];
    }
    if (input.id === "docSocio3verso") {
      fileNamesNew.value.docSocio3verso = input.files[0].name;
      docSocio3verso.value = input.files[0];
    }
    if (input.id === "docSocio3address") {
      fileNamesNew.value.docSocio3address = input.files[0].name;
      docSocio3address.value = input.files[0];
    }

    if (input.id === "docLogo") {
      fileNamesNew.value.docLogo = input.files[0].name;
      docLogo.value = input.files[0];
    }
  }
};

onMounted(async () => {
  if (props.clientId) {
    isEditMode.value = true;

    try {
      const response = await axios.get(
        `${apiUrl}/api/v1/client/${props.clientId}`,
      );
      const existingClientData = response.data; // ajuste conforme a estrutura da resposta
      // Preencha o formulário com os dados do cliente existente
      Object.assign(form, existingClientData);
    } catch (error) {
      toast.error(
        "Erro ao obter dados do cliente. Entre em contato com a BRT!",
      );
    }
  } else {
    isEditMode.value = false;
  }
});
</script>
<template>
  <form @submit.prevent="submitForm" class="space-y-4 px-6">
    <div class="bg-slate-50 justify-center -mx-6 px-2 py-6">
      <div class="flex justify-between mb-2">
        <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
          <span
            class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            v-if="tenantStore.idDeleteOrUpdate === ''"
          >
            <Icon class="-mt-0.5" :icon="icons.company" /> Adicionar dados da
            empresa</span
          >
          <span
            class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            v-else
          >
            <Icon class="-mt-0.5" :icon="icons.company" />
            Atualizar dados da empresa
          </span>
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
        <AutoCompleteTenant
          :tenantId="agency.parent_id"
          :updateTenantId="updateTenantId"
        />
      </div>
      <div class="">
        <label
          for="type-account"
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          >Tipo de Conta
        </label>
        <div class="mt-2 mb-4">
          <select
            id="type-account"
            name="type-account"
            v-model="form.agency.tenant_type"
            autocomplete="type-account"
            class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
          >
            <option value="Matriz ">Matriz</option>
            <option value="Agência">Agência</option>
            <option value="Cliente">Cliente</option>
            <option value="Unidade">Unidade</option>
          </select>
        </div>
      </div>
      <div>
        <label class="flex-0 md:w-[100px] w-[60px]"> Razão Social</label>
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
                v-model="form.agency.corporate_name"
                @blur="checkMinLength('name', 3)"
                :class="[
                  '    block w-full sm:text-sm rounded-md',
                  showMinLengthWarning['corporate_name']
                    ? 'border-red-600'
                    : 'focus:border-slate-600  border-gray-300',
                ]"
                name="vi_Fullname"
                type="text"
                placeholder="Nome da empresa"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
              <div
                v-if="showMinLengthWarning['corporate_name']"
                class="text-[10px] mt-1 ml-1 text-red-600"
              >
                Este campo precisa ter no mínimo 5 caracteres.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
        >
          Nome Fantasia
        </label>
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
                v-model="form.agency.name"
                name="vi_Fullname"
                type="text"
                placeholder="Nome da empresa"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="cnpj"
          >CNPJ</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
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
                v-model="form.agency.cpf_cnpj"
                placeholder="Digite o nome da empresa"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
        >
          Website</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
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
                v-model="form.agency.site"
                placeholder="Digite a URL do site"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="phone"
        >
          Telefone Fixo</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
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
                v-model="form.agency.phone"
                placeholder="Digite o número de telefone celular"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="last-name"
        >
          Telefone Celular</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
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
                v-model="form.agency.cellphone"
                placeholder="Digite o número do Celular"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="country"
        >
          CEP</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.cepIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                v-maska
                data-maska="#####-###"
                name="agency-zipcode"
                id="agency-zipcode"
                v-model="form.address.zipcode"
                @input="checkCEP"
                placeholder="Digite o CEP"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="street-address"
          >Logradouro</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.cepIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="street-address"
                id="street-address"
                disabled
                v-model="form.address.street"
                placeholder="Digite o logradouro"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-2 col-span-1">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
              for="street-add"
            >
              Complemento</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.complementoIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    type="text"
                    name="street-add"
                    id="street-add"
                    v-model="form.address.street_add"
                    placeholder="Digite o complemento"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Número -->
          <div>
            <label
              class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
              for="number"
            >
              Número</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.numberIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    type="text"
                    name="number"
                    id="number"
                    v-model="form.address.street_number"
                    placeholder="Digite o número do estabelecimento"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Bairro -->
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="district"
          >Bairro</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.bairroIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="district"
                id="district"
                disabled
                v-model="form.address.district"
                placeholder="Digite o bairro"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="region"
          >Cidade</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.cityIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="city"
                id="city"
                disabled
                v-model="form.address.city_name"
                placeholder="Digite a cidade"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="postal-code"
          >Estado</label
        >
        <div class="flex mt-1 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.addressIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="state"
                id="state"
                disabled
                v-model="form.address.state_name"
                placeholder="Digite o estado"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-8">
      <div class="bg-slate-50 -mx-6 px-6 py-6">
        <div class="lg:col-span-1 col-span-1 mb-6">
          <div class="grid text-slate-900 lg:grid-cols-1 grid-cols-1 mb-2">
            <span
              class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            >
              <Icon class="-mt-0.5" :icon="icons.bankIcon" /> Dados Bancários
            </span>
            <div class="flex-1 md:text-base text-xs">
              Preencha os dados da empresa corretamente.
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sm:col-span-6 mt-4">
      <label
        for="country"
        class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
        >Banco</label
      >
      <div class="mt-1">
        <!-- <AutocompletBanks :bankId="form.bank.bank_id" @update:bankId="updateBankId" :uppdateBankId="updateBankId" /> -->
        <AutoCompleteBank
          :bankId="form.bank.bank_id"
          :updateBankId="updateBankId"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 mt-5 gap-5">
      <!-- Agência -->
      <div>
        <label class="flex-0 mr-6 md:w-[50px] w-[60px] break-words input-label"
          >Agência</label
        >
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.agencyIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="bank-agency"
                id="bank-agency"
                v-maska
                data-maska="#######"
                v-model="form.bank.agency"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Conta Corrente -->
      <div>
        <label
          class="flex-0 mr-6 md:w-[50px] w-[60px] break-words input-label"
          for="account-number"
          >Conta Corrente</label
        >
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.agencyIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="account-number"
                id="account-number"
                v-maska
                data-maska="##########"
                v-model="form.bank.account_number"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Dígito -->
      <div>
        <label class="flex-0 mr-6 md:w-[50px] w-[60px] break-words input-label"
          >Dígito</label
        >
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.agencyIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="account-digit"
                id="account-digit"
                v-maska
                data-maska="#"
                v-model="form.bank.account_digit"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-5 text-slate-900 md:grid-cols-2 grid-cols-1 mb-2">
      <div>
        <div class="sm:col-span-3 mt-1">
          <label
            for="type-account"
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
            >Tipo de Conta
          </label>
          <div class="mt-2 mb-4">
            <select
              id="type-account"
              name="type-account"
              v-model="form.bank.account_type"
              autocomplete="type-account"
              class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
            >
              <option value="Pessoa Júridica">Pessoa Júridica</option>
              <option value="Pessoa Física">Pessoa Física</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="sm:col-span-3 md:mt-2 -mt-4">
          <label
            for="street-address"
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          >
            Estimativa de Vendas Mensais
          </label>
          <div class="mt-1" v-if="estimateSales && estimateSales.length > 0">
            <select
              id="agency-estimates"
              name="agency-estimates"
              v-model="form.agency.estimate_sales"
              class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
            >
              <option
                v-for="sales in estimateSales as any"
                :key="sales.id"
                :value="sales.id"
              >
                {{ sales.estimate }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 mt-1 gap-5">
      <!-- Favorecido -->
      <div class="-mt-4">
        <label
          class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="client-name"
          >Favorecido</label
        >
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.avatarIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="client-name"
                id="client-name"
                v-model="form.bank.client_name"
                placeholder="Digite o nome do Favorecido"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- E-mail para Recebimento das Faturas< -->
      <div class="-mt-4">
        <label class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
          >E-mail para Recebimento das Faturas</label
        >
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
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
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-3">
      <div class="bg-slate-50 -mx-6 px-6 py-6">
        <div class="lg:col-span-1 col-span-1 mb-6">
          <div class="grid text-slate-900 lg:grid-cols-1 grid-cols-1 mb-2">
            <span
              class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            >
              <Icon class="-mt-0.5" :icon="icons.userProfile" /> Dados do
              Representante Legal
            </span>
            <div class="flex-1 md:text-base text-xs">
              Preencha os dados da empresa corretamente.
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <label
          class="flex-0 mt-2 mr-6 md:w-[100px] w-[60px] break-words input-label"
          for="first-name"
          >Nome Completo</label
        >
        <div class="flex mt-2 items-stretch">
          <span class="flex-none input-group-addon">
            <span
              class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
            >
              <Icon :icon="icons.avatarIcon" />
            </span>
          </span>
          <div class="flex-1">
            <div class="relative fromGroup2">
              <input
                type="text"
                name="name"
                id="name"
                v-model="form.user.name"
                placeholder="Digite o nome completo do responsável"
                class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 last:mb-0">
        <!-- Agência -->
        <div class="mt-5">
          <label
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
            for="email"
            >E-mail para Login na Plataforma</label
          >
          <div class="flex mt-2 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
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
                  v-model="form.user.email"
                  placeholder="Digite um e-mail válido"
                  class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="md:mt-5 mt-1">
          <label
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
            >CPF</label
          >
          <div class="flex mt-2 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                ><Icon :icon="icons.cpfIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                  type="text"
                  name="cpf"
                  id="cpf"
                  v-model="form.user.cpf"
                  v-maska
                  data-maska="###.###.###-##"
                  placeholder="Digite o número do CPF"
                  class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div class="">
          <label
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
            >Senha</label
          >
          <div class="flex mt-2 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
              >
                <Icon :icon="icons.lockIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                  type="password"
                  name="password"
                  autocomplete="new-password"
                  id="password"
                  v-model="form.user.password"
                  @blur="checkMinLength('password', 6)"
                  :class="[
                    'block w-full sm:text-sm rounded-md',
                    showMinLengthWarning['password'] || passwordDifferent
                      ? 'border-red-600'
                      : 'focus:border-indigo-500 border-gray-300',
                  ]"
                  placeholder="Digite uma senha"
                  class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="">
          <label
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
            >Confirme a senha</label
          >
          <div class="flex mt-2 items-stretch">
            <span class="flex-none input-group-addon">
              <span
                class="bg-white d transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
              >
                <Icon :icon="icons.lockIcon" />
              </span>
            </span>
            <div class="flex-1">
              <div class="relative fromGroup2">
                <input
                  type="password"
                  name="password-re"
                  autocomplete="new-password"
                  id="password-re"
                  @blur="checkMinLength('password_confirmation', 6)"
                  v-model="form.user.password_confirmation"
                  :class="[
                    ' block w-full sm:text-sm rounded-md',
                    showMinLengthWarning['password'] || passwordDifferent
                      ? 'border-red-600'
                      : 'focus:border-indigo-500 border-gray-300',
                  ]"
                  placeholder="Digite um e-mail válido"
                  class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 rounded placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 grid-cols-2 grid gap-5 last:mb-0">
        <div>
          <label
            for="how-meet"
            class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
            >Como conheceu a BRT?
          </label>
          <div class="mt-2 mb-4" v-if="howMeet && howMeet.length > 0">
            <select
              id="how-meet"
              name="how-meet"
              autocomplete="how-meet"
              class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
              v-model="form.user.how_did_you_meet"
            >
              <option
                v-for="meet in howMeet as any"
                :key="meet.id"
                :value="meet.id"
              >
                {{ meet.how }}
              </option>
            </select>
          </div>
        </div>

        <div>
          <div class="sm:col-span-3" v-if="segments && segments.length > 0">
            <label
              for="segment"
              class="flex-0 mr-6 md:w-[100px] w-[60px] break-words input-label"
              >Segmento da sua agência
            </label>
            <div class="mt-2 mb-4">
              <select
                id="segment"
                name="segment"
                autocomplete="segment"
                class="block w-full rounded-sm b py-2.5 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
                v-model="form.agency.segment"
              >
                <option
                  v-for="segment in segments as any"
                  :key="segment.id"
                  :value="segment.id"
                >
                  {{ segment.segment }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-1">
      <div class="bg-slate-50 -mx-6 px-6 py-6">
        <div class="lg:col-span-1 col-span-1 mb-6">
          <div class="grid text-slate-900 lg:grid-cols-1 grid-cols-1 mb-2">
            <span
              class="flex items-center md:text-xl gap-2 font-semibold text-lg"
            >
              <Icon class="-mt-0.5" :icon="icons.sendFile" /> Envio de
              Documentos
            </span>
            <div class="flex-1 md:text-base text-xs">
              Envie documentos legíveis. Serão aceitos documentos nos formatos
              PNG, JPG, PDF ou DOC até 1mb.
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
        <!-- ANEXO PARA CONTRATO -->
        <div>
          <div id="attach-contract" class="mt-6 flex flex-col gap-2">
            <p class="mt-1 text-sm font-bold">
              Anexo do Contrato Social ou Certificado de MEI
              <span class="text-red-500 text-xs">(Obrigatório)</span>
            </p>
            <div class="relative w-full flex">
              <input
                type="file"
                class="hidden"
                ref="input1"
                id="docContract1"
                accept=".jpg, .jpeg, .png, .pdf, .doc"
                @change="(event) => handleFileChangeNovo(event)"
              />
              <label
                for="file_input"
                @click="() => triggerFileInput('input1')"
                class="w-full h-[40px] file-control flex items-center rounded-sm b g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm pl-8 placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
              >
                <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
                Selecionar Arquivo
              </label>
              <span
                id="file_name"
                class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
                >{{ fileNamesNew.docContract1 }}</span
              >
            </div>
            <p class="mt-1 text-xs">
              Se o seu contrato social estiver separado faça o upload da
              primeira página e em seguida nós entramos em contato para
              solicitar as demais.
            </p>
          </div>
        </div>
        <!-- ANEXO PARA COMPROVANTE DE ENDEREÇO -->
        <div>
          <div id="attach-address" class="mt-6 flex flex-col gap-2">
            <p class="mt-1 text-sm font-bold">
              Comprovante de endereço da agência
              <span class="text-red-500 text-xs">(Obrigatório)</span>
            </p>
            <div class="relative w-full flex">
              <input
                type="file"
                class="hidden"
                id="docAddress1"
                accept=".jpg, .jpeg, .png, .pdf, .doc"
                ref="input2"
                @change="(event) => handleFileChangeNovo(event)"
              />
              <label
                for="file_input"
                @click="() => triggerFileInput('input2')"
                class="w-full h-[40px] file-control flex items-center rounded-sm b g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm pl-8 placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
              >
                <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
                Selecionar arquivo
              </label>
              <span
                id="file_name_2"
                class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
                >{{ fileNamesNew.docAddress1 }}</span
              >
            </div>
            <p class="mt-1 text-xs">
              Enviar um comprovante com data de vencimento atual (deste mês ou
              do mês passado).
            </p>
          </div>
        </div>
        <!-- ANEXO PARA LOGO -->
        <div id="attach-owner-3" class="mt-4 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">Logomarca da sua agência</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docLogo"
              accept=".jpg, .jpeg, .png, .pdf, .svg"
              ref="input12"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input12')"
              class="w-full h-[40px] file-control flex items-center rounded-sm b g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm pl-8 placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_5"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docLogo }}</span
            >
          </div>
          <p class="mt-1 text-xs">Para personalizar o portal da sua agência.</p>
        </div>
      </div>

      <div
        class="relative border-b-slate-900 border-opacity-[16%] border-b pt-6"
      ></div>
      <!-- ANEXO PARA SÓCIO 1 -->
      <div class="text-2xl font-bold mt-8">Documentos do Sócio 1</div>
      <span class="flex items-center md:text-xl gap-2 font-semibold text-lg">
        <Icon class="-mt-0.5" :icon="icons.userProfile" /> Dados do
        Representante Legal
      </span>
      <div class="text-xs mt-1">
        Os documentos do sócio 1 são obrigatórios para o cadastro da agência.
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
        <div id="attach-owner" class="mt-4 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">
            CNH ou RG - FRENTE
            <span class="text-red-500 text-xs">(Obrigatório)</span>
          </p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio1"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input3"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input3')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_3"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio1 }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar uma foto do documento original ou autenticado.
          </p>
        </div>

        <!-- ANEXO PARA SÓCIO 1 - VERSO -->
        <div id="attach-owner" class="mt-4 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">
            CNH ou RG - VERSO
            <span class="text-red-500 text-xs">(Obrigatório)</span>
          </p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio1verso"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input4"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input4')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_3"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio1verso }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar uma foto do documento original ou autenticado.
          </p>
        </div>

        <!-- ANEXO PARA SÓCIO 1 - ENDEREÇO -->
        <div id="attach-owner" class="mt-1 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">
            Comprovante Endereço
            <span class="text-red-500 text-xs">(Obrigatório)</span>
          </p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio1address"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input5"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input5')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_3"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio1address }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar um comprovante com data de vencimento atual (deste mês ou do
            mês passado).
          </p>
        </div>
      </div>

      <div
        class="relative border-b-slate-900 border-opacity-[16%] border-b pt-6"
      ></div>

      <!-- ANEXO PARA SÓCIO 2 -->
      <div class="text-2xl font-bold mt-4">Documentos do Sócio 2</div>
      <div class="text-xs mt-1">
        Se houver mais de um sócio, será necessário enviar os documentos pois
        serão solicitados para assinatura do contrato
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
        <div id="attach-owner-2" class="mt-1 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">CNH ou RG - FRENTE</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio2"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input6"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input6')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_4"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio2 }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar uma foto do documento original ou autenticado.
          </p>
        </div>

        <!-- ANEXO PARA SÓCIO 2 - VERSO -->
        <div id="attach-owner-2" class="mt-1 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">CNH ou RG - VERSO</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio2verso"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input7"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input7')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_4"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio2verso }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar uma foto do documento original ou autenticado.
          </p>
        </div>

        <!-- ANEXO PARA SÓCIO 2 - ENDEREÇO -->
        <div id="attach-owner-2" class="mt-1 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">Comprovante Endereço</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio2address"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input8"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input8')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_4"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio2address }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar um comprovante com data de vencimento atual (deste mês ou do
            mês passado).
          </p>
        </div>
      </div>
      <div
        class="relative border-b-slate-900 border-opacity-[16%] border-b pt-6"
      ></div>

      <!-- ANEXO PARA SÓCIO 3 -->
      <div class="text-2xl font-bold mt-4">Documentos do Sócio 3</div>
      <div class="text-xs mt-1">
        Se houver mais de um sócio, será necessário enviar os documentos pois
        serão solicitados para assinatura do contrato
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-1">
        <div id="attach-owner-3" class="mt-4 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">CNH ou RG - FRENTE</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio3"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input9"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input9')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-2" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_5"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio3 }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar uma foto do documento original ou autenticado.
          </p>
        </div>

        <!-- ANEXO PARA SÓCIO 3 - VERSO -->
        <div id="attach-owner-3" class="mt-4 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">CNH ou RG - VERSO</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio3verso"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input10"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input10')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-2" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_5"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio3verso }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar uma foto do documento original ou autenticado.
          </p>
        </div>

        <!-- ANEXO PARA SÓCIO 3 - ADDRESS -->
        <div id="attach-owner-3" class="mt-4 flex flex-col gap-2">
          <p class="mt-1 text-sm font-bold">Comprovante Endereço</p>
          <div class="relative w-full flex">
            <input
              type="file"
              class="hidden"
              id="docSocio3address"
              accept=".jpg, .jpeg, .png, .pdf, .doc"
              ref="input11"
              @change="(event) => handleFileChangeNovo(event)"
            />
            <label
              for="file_input"
              @click="() => triggerFileInput('input11')"
              class="w-full h-[40px] file-control flex items-center rounded-sm g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none t text-sm placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg"
            >
              <Icon class="-mt-0.5 mr-3" :icon="icons.sendFileinput" />
              Selecionar Arquivo
            </label>
            <span
              id="file_name_5"
              class="p-2 border w-7/12 h-10 flex-none cursor-pointer overflow-hidden border-l px-4 border-slate-200 inline-flex items-center text-slate-600 text-base rounded-tr rounded-br font-normal whitespace-nowrap overflow-ellipsis"
              >{{ fileNamesNew.docSocio3address }}</span
            >
          </div>
          <p class="mt-1 text-xs">
            Enviar um comprovante com data de vencimento atual (deste mês ou do
            mês passado).
          </p>
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
                  v-model="form.agency.privacy_policy_accept"
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
    </div>

    <!-- Botão de envio -->

    <div class="flex justify-end gap-1">
      <button
        :disabled="isFormEmpty || tenantStore.isLoading"
        :class="tenantStore.isLoading ? 'opacity-50' : ''"
        type="submit"
        class="mt-5 inline-flex transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
        @click="submitForm"
      >
        <div
          v-if="!tenantStore.isLoading"
          :class="{
            'bg-slate-500 py-2 px-3 rounded': isFormEmpty,
            'bg-state-900 focus:outline-none': !isFormEmpty,
          }"
        >
          <span v-if="isFormEmpty">Preencha todos os campos</span>
          <span v-else class="flex items-center">
            <img
              src="/assets/wired-outline-259-share-arrow.gif"
              alt="Ícone de envio"
              class="w-5 h-5 mr-2"
            />
            Enviar Cadastro
          </span>
        </div>
        <div v-else class="inline-flex">
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
          <div class="px-2 mt-0.5">Enviando...</div>
        </div>
      </button>
    </div>
    <div
      class="text-[10px] 1 ml-1 text-red-600 text-right mr-4 mt-1"
      v-if="isFormEmpty"
    >
      Você possui campos em branco ou inválidos!
    </div>

    <!-- CAMPOS ESCONDIDOS PARA RDSTATION -->
    <div>
      <input
        type="hidden"
        name="how-you-meet-hidden"
        id="how-you-meet-hidden"
        v-model="howYouMeetHidden"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
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
      <input
        type="hidden"
        name="bank-hidden"
        id="bank-hidden"
        v-model="bankHidden"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </form>
</template>

<style>
/* Adicione estilos CSS para a animação de carregamento */
.loader {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 20px;
  height: 20px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
