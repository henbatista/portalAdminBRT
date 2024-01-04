<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useMarkupStore } from "~/stores/MarkupStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import { useRecommendedHotelStore } from "~/stores/RecommendedHotelStore";
import type {
  Markup,
  Commission,
  Rule,
  HotelRuleId,
  HotelRuleName,
} from "../../types/markup";
import { Icon } from "@iconify/vue";
import { Switch } from "@headlessui/vue";

// Variável reativa para controlar o estado de 'is_active'
const is_active = ref(false);

// Assista a mudanças em 'is_active' e imprima o valor no console
watch(is_active, (newVal) => {
  // Atribuir 1 se is_active for true, 0 se for false
  const value = newVal ? true : false;
  console.log(value); // Aqui você pode usar o valor conforme necessário
});

// Instâncias dos stores e do Toast
const markupStore = useMarkupStore();
const recommendedHotelStore = useRecommendedHotelStore();
const sidebarStore = useSidebarStoreTenant();

// icons
const markupIcon = "fluent-mdl2:pie-double";
const titleIcon = "ph:chart-pie";
const priorityIcon = "ic:outline-priority-high";
const markupReceivedIcon = "icon-park-twotone:pie-six";
const markupApliedIcon = "icon-park-twotone:pie-two";
const markupTitle = "fluent:data-pie-20-regular";
const tenantsIcon = "material-symbols:store-outline";
const comissionIcon = "fluent:money-hand-20-regular";
const ruleIcon = "ic:baseline-rule";
const titleComission = "vaadin:money-deposit";
const valueComission = "fluent-emoji-high-contrast:money-bag";
const ruleTypeIcon = "carbon:rule";
const dateIcon = "uiw:date";
const plusIcon = "tabler:plus";
const minusIcon = "tabler:minus";
const hotelNameIcon = "emojione-monotone:hotel";
const icons = {
  markupIcon,
  titleIcon,
  priorityIcon,
  markupReceivedIcon,
  markupTitle,
  markupApliedIcon,
  tenantsIcon,
  comissionIcon,
  ruleIcon,
  titleComission,
  valueComission,
  ruleTypeIcon,
  dateIcon,
  plusIcon,
  minusIcon,
  hotelNameIcon,
};
const hotelRuleId = ref<HotelRuleId>({
  hotel_id: "",
  hotel_name: "",
});

const hotelRuleName = ref<HotelRuleName>({
  hotel_name: "",
});

const rule = ref<Rule>({
  markup_rule_type: "",
  markup_rule_period_inicial: "",
  markup_rule_period_final: "",
  markup_rule_days: 0,
  markup_rule_hotel_ids: [hotelRuleId.value],
  markup_rule_hotel_names: [hotelRuleName.value],
  markup_rule_value: 0,
  markup_rule_is_active: false,
});

const commission = ref<Commission>({
  markup_commission_tenant_ids: "",
  markup_commission_commission_pay: 0,
  markup_commission_commission_receive: "",
  markup_commission_title: "",
  markup_commission_is_active: false,
});

const markups = ref<Markup>({
  markup_id: "",
  markup_priority: 0,
  markup_type: 0,
  markup_tenant_ids: [],
  markup_aplied: 0,
  markup_received: 0,
  markup_title: "",
  markup_is_active: true,
  markup_commission: [commission.value],
  markup_rules: [rule.value],
});

function handleSubmit() {
  const { idDeleteOrUpdate } = markupStore;

  const isUpdate = idDeleteOrUpdate !== "";

  const saveOrUpdateMarkup = isUpdate
    ? markupStore.updateMarkup
    : markupStore.saveMarkup;

  saveOrUpdateMarkup(markups.value);
}

const updateTenantId = (TenantName: string, newTenantId: any) => {
  console.log(typeof newTenantId);
  markups.value.markup_tenant_ids = newTenantId;
};

const updateTenantIdComission = (TenantName: string, newTenantId: any) => {
  commission.value.markup_commission_tenant_ids = newTenantId;
};

onMounted(() => {
  const markupExist = markupStore.markups?.find(
    (markup) => markup.markup_id === markupStore.idDeleteOrUpdate,
  );
  const updateCommission = (commission: Commission[]) => {
    const commissionsUpdated = commission.map((commission) => ({
      ...commission,
    }));
    return commissionsUpdated;
  };

  if (markupExist) {
    markupStore.markupToUpdate = markupExist;
    // console.log("COMMISION: ", toRaw(markupExist))
    // markups.value.markup_id = markupExist.markup_id;
    // markups.value.markup_priority = markupExist.markup_priority;
    // markups.value.markup_type = markupExist.markup_type;
    // markups.value.markup_tenants = markupExist.markup_tenants;
    // markups.value.markup_aplied = markupExist.markup_aplied;
    // markups.value.markup_received = markupExist.markup_received;
    // markups.value.markup_title = markupExist.markup_title;
    // markups.value.markup_is_active = markupExist.markup_is_active;
    // Se a tua lógica funcionar é só mudar aqui... Por mais que deu problema no TYPE agora... conseguimos rodar somente para teste
    // Temos que tirar a função do MAP... porque ela não é necessaria... pois só agora que eu vi que já vem do back como array...
    // O problema dse ontem quando fizemos essa função é que não sabiamos que tava errado o nome commisions
    // markups.value.markup_commission = markupExist.commission;
    // markups.value.markup_commission = markupExist.markup_commission ;
    // markups.value.markup_rules = markupExist.markup_rules;
  }
});

const idHotelLocal = ref("");

// Quando o hotel selecionado na store muda, atualize a variável local
watch(
  () => recommendedHotelStore.selectedHotel,
  (newVal) => {
    // Converte o valor para string antes de atribuir a idHotelLocal
    idHotelLocal.value = newVal && newVal.code ? newVal.code.toString() : "";
    console.log("idHotelLocal updated:", idHotelLocal.value); // Checagem para ver o valor atualizado
  },
  { immediate: true },
);

// Quando a variável local muda, atualize a store
watch(idHotelLocal, (newVal) => {
  if (recommendedHotelStore.selectedHotel) {
    recommendedHotelStore.selectedHotel.code = newVal;
    hotelRuleId.value.hotel_id = newVal;
  }
});

const nameHotelLocal = ref("");

// Quando o hotel selecionado na store muda, atualize a variável local
watch(
  () => recommendedHotelStore.selectedHotel,
  (newVal) => {
    // Converte o valor para string antes de atribuir a idHotelLocal
    nameHotelLocal.value = newVal && newVal.name ? newVal.name.toString() : "";
    console.log("idHotelLocal updated:", nameHotelLocal.value); // Checagem para ver o valor atualizado
  },
  { immediate: true },
);

// Quando a variável local muda, atualize a store
watch(nameHotelLocal, (newVal) => {
  if (recommendedHotelStore.selectedHotel) {
    recommendedHotelStore.selectedHotel.name = newVal;
    hotelRuleName.value.hotel_name = newVal;
  }
});
</script>

<template>
  <div class="bg-slate-50 justify-center -mx-6 px-6 py-6">
    <div class="flex justify-between mb-2">
      <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-if="markupStore.idDeleteOrUpdate === ''"
        >
          <Icon class="-mt-0.5" :icon="icons.markupIcon" /> Adicionar
          Markup</span
        >
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-else
        >
          <Icon class="-mt-0.5" :icon="icons.markupIcon" />
          Atualizar Markup</span
        >
        <div class="flex-1 md:text-base text-xs">
          Preencha os dados para cadastrar um novo Usuário.
        </div>
      </div>
      <button @click="sidebarStore.sideBarActionTenant = false">
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
  <div class="mt-3">
    <div class="mx-5">
      <form @submit.prevent="handleSubmit">
        <div class="grid xl:grid-cols-1 grid-cols-1 gap-2">
          <!-- Cadastrar Markup -->
          <AccordionItem title="CADASTRAR MARKUP" :icon="icons.markupIcon">
            <div>
              <div
                class="grid xl:grid-cols-2 mt-1 grid-cols-1 gap-5 bg-slate-50 justify-center -mx-0 px-6 py-3"
              >
                <!-- Título -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Título do Markup</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.titleIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="markups.markup_title"
                          name="markup_title"
                          type="text"
                          placeholder="Digite o título do markup"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Prioridade -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Prioridade do Markup</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.priorityIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="markups.markup_priority"
                          label="Prioridade do Markup"
                          name="markup_priority"
                          type="number"
                          placeholder="Digite a prioridade do markup"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tipo do Markup -->
                <div class="">
                  <label
                    for="type-account"
                    class="flex-0 mr-6 text-sm md:w-[100px] w-[60px] break-words input-label"
                    >Tipo do Markup
                  </label>
                  <div class="mt-1">
                    <select
                      id="markup_type"
                      name="markup_type"
                      type="number"
                      v-model="markups.markup_type"
                      autocomplete="type-account"
                      class="block w-full rounded-sm b h-10 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
                    >
                      <option value="1">Tipo 1</option>
                      <option value="2">Tipo 2</option>
                      <option value="3">Tipo 3</option>
                      <option value="4">Tipo 4</option>
                      <option value="5">Tipo 5</option>
                      <option value="6">Tipo 6</option>
                      <option value="7">Tipo 7</option>
                      <option value="8">Tipo 8</option>
                      <option value="9">Tipo 9</option>
                      <option value="10">Tipo 10</option>
                    </select>
                  </div>
                </div>

                <!-- Valor recebido do Markup -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]"
                    >Valor recebido do Markup</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.markupReceivedIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="markups.markup_received"
                          name="markup_received"
                          label="Valor recebido do Markup"
                          type="Valor recebido do Markup"
                          placeholder="Digite o valor a ser recebido do markup"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Valor aplicado do Markup -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Valor aplicado do Markup 0-100</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.markupApliedIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="markups.markup_aplied"
                          name="markup_aplied"
                          label="Valor aplicado do Markup"
                          type="number"
                          placeholder="Insira o númedo do valor aplicado do markup"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Autocomplete Tenante -->
                <div>
                  <AutoCompleteTenantmutiplo
                    :tenantId="markups.markup_tenant_ids"
                    :updateTenantId="updateTenantId"
                    teste="Tetetererer"
                  />
                </div>
              </div>
            </div>
          </AccordionItem>

          <!-- Cadastrar Comissão -->
          <AccordionItem
            title="CADASTRAR COMISSÃO"
            :icon="icons.titleComission"
          >
            <div>
              <div
                class="grid xl:grid-cols-2 mt-1 grid-cols-1 gap-5 bg-slate-50 justify-center -mx-0 px-6 py-3"
              >
                <!--  Título da comissão -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Título da comissão</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.titleComission" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="commission.markup_commission_title"
                          name="markup_commission_title"
                          label=" Título da comissão"
                          type="text"
                          placeholder="Digite o título da comissão"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Valor da Comissão -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Valor da Comissão</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.valueComission" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="commission.markup_commission_commission_pay"
                          name="markup_commission_commission_pay"
                          label="Valor da Comissão"
                          type="number"
                          placeholder="Digite o valor da comissão"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Valor da comissão  do provedor de serviços -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Valor da comissão do provedor de serviços</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.valueComission" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="
                            commission.markup_commission_commission_receive
                          "
                          name="markup_commission_commission_receive"
                          label="Valor da comissão do provedor de serviços"
                          type="number"
                          placeholder="Digite o valor da comissão do provedor de serviços"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Qual empresa receberá esse markup? -->
                <div>
                  <AutoCompleteTenantmutiplo
                    :tenantId="commission.markup_commission_tenant_ids"
                    :updateTenantId="updateTenantIdComission"
                  />
                </div>

                <!-- Ativo? -->
                <div>
                  <div
                    class="grid gap-1 text-slate-900 md:grid-cols-1 mt-2 grid-cols-1 mb-2"
                  >
                    <label class="text-sm mt-1">Manter markup ativo? </label>
                    <Switch
                      v-model="commission.markup_commission_is_active"
                      :class="is_active ? 'bg-sky-800' : 'bg-slate-600'"
                      class="relative mt-1 inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                      <span class="sr-only text-cyan-300"></span>
                      <span
                        aria-hidden="true"
                        :class="
                          commission.markup_commission_is_active
                            ? 'translate-x-4'
                            : '-translate-x-0.5'
                        "
                        class="pointer-events-none inline-block h-[18px] -mt-0.5 w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>

          <!-- Cadastrar Regra -->
          <AccordionItem title="CADASTRAR REGRA" :icon="icons.ruleIcon">
            <div>
              <div
                class="grid xl:grid-cols-2 mt-1 grid-cols-1 gap-5 bg-slate-50 justify-center -mx-0 px-6 py-3"
              >
                <!-- Tipo de Regra -->
                <div class="">
                  <label
                    for="type-account"
                    class="flex-0 mr-6 text-sm md:w-[100px] w-[60px] break-words input-label"
                    >Tipo de Regra
                  </label>
                  <div class="mt-1">
                    <select
                      id="type-account"
                      name="type-account"
                      v-model="rule.markup_rule_type"
                      autocomplete="type-account"
                      class="block w-full rounded-sm b h-10 g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 focus:outline-none text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600"
                    >
                      <option value="Teste">Tipo 1</option>
                      <option value="Teste">Tipo 2</option>
                      <option value="Teste">Tipo 3</option>
                      <option value="Teste">Tipo 4</option>
                      <option value="Teste">Tipo 5</option>
                      <option value="Teste">Tipo 6</option>
                      <option value="Teste">Tipo 7</option>
                      <option value="Teste">Tipo 8</option>
                      <option value="Teste">Tipo 9</option>
                      <option value="Teste">Tipo 10</option>
                    </select>
                  </div>
                </div>
                <div></div>

                <!-- Validade Inicial da regra -->

                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Data de início da regra</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.dateIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="rule.markup_rule_period_inicial"
                          name="markup_rule_period_inicial"
                          label="Data de início da regra"
                          type="date"
                          placeholder="Insira a data de início da regra"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Validade final da regra -->

                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Data final da regra</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.dateIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="rule.markup_rule_period_final"
                          name="markup_rule_period_final"
                          label="Data final da regra"
                          type="date"
                          placeholder="Insira a data final da regra"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Antecedência da Compra -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]"
                    >Antecedência da Compra</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.markupReceivedIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="rule.markup_rule_days"
                          name="markup_rule_days"
                          label="Antecedência da Compra"
                          type="number"
                          placeholder="Digita a antecedência da Compra"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Hotéis -->

                <AutoCompleteHotels v-model="hotelRuleId.hotel_name" />

                <div class="hidden">
                  <!-- ID do Hotel -->
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    ID do Hotel
                  </label>
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.markupReceivedIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="idHotelLocal"
                          name="idHotel"
                          label="idHotel"
                          type="text"
                          placeholder="Provedor do hotel"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="hidden">
                  <!-- Nome do Hotel -->
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]">
                    Nome do Hotel
                  </label>
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.hotelNameIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="nameHotelLocal"
                          name="idHotel"
                          label="idHotel"
                          type="text"
                          placeholder="Provedor do hotel"
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Valor do markup -->
                <div>
                  <label class="flex-0 text-sm md:w-[100px] w-[60px]"
                    >Valor do markup 0 - 100</label
                  >
                  <div class="flex mt-1 items-stretch">
                    <span class="flex-none input-group-addon">
                      <span
                        class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                      >
                        <Icon :icon="icons.tenantsIcon" />
                      </span>
                    </span>
                    <div class="flex-1">
                      <div class="relative fromGroup2">
                        <input
                          v-model="rule.markup_rule_value"
                          name="markup_rule_value"
                          label="Valor do markup"
                          type="number"
                          placeholder="digite o valor do markup "
                          class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div
                    class="grid gap-1 text-slate-900 md:grid-cols-1 grid-cols-1 mb-2"
                  >
                    <label class="text-sm mt-1">Manter regra ativa? </label>
                    <Switch
                      v-model="rule.markup_rule_is_active"
                      :class="is_active ? 'bg-sky-800' : 'bg-slate-600'"
                      class="relative mt-1 inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                      <span class="sr-only text-cyan-300"></span>
                      <span
                        aria-hidden="true"
                        :class="
                          rule.markup_rule_is_active
                            ? 'translate-x-4'
                            : '-translate-x-0.5'
                        "
                        class="pointer-events-none inline-block h-[18px] -mt-0.5 w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        </div>
      </form>
      <div class="grid xl:grid-cols-1">
        <div class="justify-self-end xl:mt-0 mb-10">
          <!-- Botão de envio -->
          <div class="text-right mt-6">
            <button
              @click="handleSubmit"
              :class="!markupStore.isLoading ? '' : 'opacity-50'"
              class="inline-flex mt-3 transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
            >
              <div
                v-if="!markupStore.isLoading"
                class="flex justify-center gap-5 items-center"
              >
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
                <span v-if="markupStore.idDeleteOrUpdate === ''"
                  >ADICIONAR MARKUP</span
                ><span v-else>ATUALIZAR MARKUP</span>
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
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button:hover {
  transform: scale(1.02);
}
</style>
