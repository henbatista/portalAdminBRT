<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useSidebarStoreTenant } from "~/stores/SidebarStoreTenant";
import type { User } from "../../types/newUser";
import type { UserComplete } from "~/types/userComplete";
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

const userName = ref({ name: "Nome do Usuário" });
const imagePreview = ref("/assets/profile.gif");

const updateImagePreview = (base64Image: string) => {
  const prefixedBase64Image = base64Image.startsWith("data:image/jpeg;base64,")
    ? base64Image
    : `data:image/jpeg;base64,${base64Image}`;

  console.log("Antes da atualização:", imagePreview.value);

  imagePreview.value = prefixedBase64Image;
  user.value.avatar = prefixedBase64Image;

  console.log("Depois da atualização:", imagePreview.value);
};

const imageToBase64 = (
  file: File,
  callback: (base64Image: string) => void,
  maxWidth: number = 300,
  maxHeight: number = 300,
) => {
  const reader = new FileReader();

  reader.onload = function () {
    const img = new Image();
    img.src = reader.result as string;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      const base64String = canvas.toDataURL("image/jpeg").split(",")[1];
      if (base64String) {
        callback(base64String);
      }
    };
  };

  reader.readAsDataURL(file);
};

const handleImageUpload = (event: Event) => {
  const fileInput = event.target as HTMLInputElement;
  const file = fileInput.files?.[0];

  if (file) {
    imageToBase64(file, (base64Image) => {
      updateImagePreview(base64Image);
    });
  }
};

// Instâncias dos stores e do Toast
const userStore = useUserStore();
const sidebarStore = useSidebarStoreTenant();

const stateIcon = "ph:user-circle-plus-light";
const nameIcon = "icon-park-outline:edit-name";
const emailIcon = "clarity:email-line";
const documentIcon = "mdi:drivers-license-outline";
const passportIcon = "solar:passport-linear";
const dateIcon = "uiw:date";
const telephoneIcon = "bytesize:telephone";
const cellphoneIcon = "mingcute:cellphone-line";
const parentIcon = "ri:parent-line";
const passwordIcon = "solar:lock-password-linear";
const imageIcon = "uil:image-upload";

const icons = {
  stateIcon,
  nameIcon,
  emailIcon,
  documentIcon,
  passportIcon,
  dateIcon,
  telephoneIcon,
  cellphoneIcon,
  parentIcon,
  passwordIcon,
  imageIcon,
};

const user = ref<User>({
  name: "",
  email: "",
  avatar: "",
  rg: "",
  cpf: "",
  password: "",
  password_confirmation: "",
  passport: "",
  passport_expiry: "",
  tenant_id: "",
  phone: "",
  cellphone: "",
  ext: "",
  mother_name: "",
  father_name: "",
  is_active: false,
});

function handleSubmit() {
  const { idDeleteOrUpdate } = userStore;

  const isUpdate = idDeleteOrUpdate !== "";

  const saveOrUpdateTenant = isUpdate
    ? userStore.updateUsers
    : userStore.saveUser;

  saveOrUpdateTenant(
    userStore.idDeleteOrUpdate,
    user.value.name,
    user.value.email,
    user.value.avatar,
    user.value.rg,
    user.value.cpf,
    user.value.password,
    user.value.password_confirmation,
    user.value.passport,
    user.value.passport_expiry,
    user.value.tenant_id,
    user.value.phone,
    user.value.cellphone,
    user.value.ext,
    user.value.mother_name,
    user.value.father_name,
    user.value.is_active,
  );
}

const tenant = ref<UserComplete>({
  name: "",
  tenant_id: 0,
});

const updateTenantId = (TenantName: string, newTenantId: any) => {
  user.value.tenant_id = newTenantId;
};

onMounted(() => {
  const userExist = userStore.users?.find(
    (user) => user.id === userStore.idDeleteOrUpdate,
  );
  if (userExist) {
    user.value.name = userExist.name;
    user.value.email = userExist.email;
    user.value.rg = userExist.rg;
    user.value.cpf = userExist.cpf;
    user.value.passport = userExist.passport;
    user.value.passport_expiry = userExist.passport_expiry;
    user.value.tenant_id = userExist.tenant_id;
    user.value.phone = userExist.phone;
    user.value.cellphone = userExist.cellphone;
    user.value.ext = userExist.ext;
    user.value.mother_name = userExist.mother_name;
    (user.value.father_name = userExist.father_name),
      (user.value.is_active = userExist.is_active);

    // Atualiza a prévia da imagem ao carregar os dados existentes
    if (userExist.avatar) {
      updateImagePreview(userExist.avatar);
    }
  }
});
</script>

<template>
  <div class="bg-slate-50 justify-center -mx-6 px-6 py-6">
    <div class="flex justify-between mb-2">
      <div class="ml-6 grid text-slate-900 lg:grid-cols-1 grid-cols-1">
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-if="userStore.idDeleteOrUpdate === ''"
        >
          <Icon class="-mt-0.5" :icon="icons.stateIcon" /> Adicionar
          Usuário</span
        >
        <span
          class="flex items-center md:text-xl gap-2 font-semibold text-lg"
          v-else
        >
          <Icon class="-mt-0.5" :icon="icons.stateIcon" />
          Atualizar Usuário</span
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
    <div class="lg:col-span-3 md:col-span-5 col-span-12">
      <div class="space-y-2 items-center justify-center">
        <div
          class="h-[100px] w-[100px] mx-auto rounded-full ring-4 ring-white relative"
        >
          <img
            :src="user.avatar || imagePreview"
            alt="Avatar Preview"
            class="w-full h-full object-cover rounded-full"
          />
          <div class="mt-14">
            <div class="text-center mt-7">
              <label class="cursor-pointer">
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  ref="fileInput"
                  class="hidden shadow-xl"
                  @change="handleImageUpload"
                />
                <span
                  class="absolute right-2 h-6 w-6 bg-white ring-1 ring-slate-500 text-slate-600 rounded-full shadow-xl flex flex-col items-center justify-center md:top-[80px] top-[120px]"
                >
                  <Icon :icon="icons.imageIcon" />
                </span>
              </label>
            </div>
          </div>
        </div>
        <div class="mx-auto text-lg text-center">{{ user.name }}</div>
        <div class="text-xs px-60 text-slate-600 text-center">
          <span class="font-bold"> Não se esqueça:</span> Para melhor resultado,
          use uma imagem com o tamanho de 200px por 200px nos formatos .jpg ou
          .png
        </div>
      </div>
    </div>
    <div class="mx-5">
      <div class="profile-box mt-1 mb-4 flex-none md:text-start text-center">
        <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
          <div class="flex-1">
            <input
              type="file"
              ref="fileInput"
              style="display: none"
              accept="image/jpeg, image/png"
            />
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="grid xl:grid-cols-2 grid-cols-1 gap-5">
          <!-- Nome -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]"> Nome</label>
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.nameIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.name"
                    name="name"
                    type="text"
                    placeholder="Digite o nome de usuário"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]"> Email</label>
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
                    v-model="user.email"
                    label="Email"
                    name="vi_Fullname"
                    type="email"
                    placeholder="Digite seu email"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid xl:grid-cols-3 mt-4 grid-cols-1 gap-5">
          <!-- RG -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]"> RG</label>
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.documentIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.rg"
                    label="RG"
                    name="vi_Fullname"
                    type="text"
                    placeholder="Digite o RG"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- CPF -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]"> CPF</label>
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.documentIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.cpf"
                    name="vi_Fullname"
                    label="CPF"
                    type="text"
                    placeholder="ex. 999.999.999-99"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Passaporte -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Passaporte</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.passportIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.passport"
                    name="vi_Fullname"
                    label="Passaport"
                    type="text"
                    placeholder="Insira o númedo do passaport"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Data de Expiração -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Data de Expiração</label
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
                    v-model="user.passport_expiry"
                    name="vi_Fullname"
                    label="Passaport"
                    type="date"
                    placeholder="Insira o númedo do passaport"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Telefone -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Telefone</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.telephoneIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.phone"
                    name="phone"
                    label="Telefone"
                    type="text"
                    placeholder="ex. (41) 9999-9999"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Celular -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]"> Celular</label>
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
                    v-model="user.cellphone"
                    name="phone"
                    label="Cellfone"
                    type="text"
                    placeholder="ex. (41) 9999-9999"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid xl:grid-cols-2 mt-4 grid-cols-1 gap-5">
          <!-- Nome da Mãe -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Nome da Mãe</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.parentIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.mother_name"
                    name="mother_name"
                    label="Nome da Mãe"
                    type="text"
                    placeholder="Digite o nome de usuário"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Nome do Pai -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Nome do Pai</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.parentIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.father_name"
                    name="father_name"
                    label="Nome do Pai"
                    type="text"
                    placeholder="Digite o nome do pai do usuário"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Senha -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]"> Senha</label>
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.passwordIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.password"
                    name="multi_password"
                    label="Senha"
                    type="password"
                    placeholder="8+ caracteres, 1 letra maiúscula"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Confirmar Senha -->
          <div>
            <label class="flex-0 text-sm md:w-[100px] w-[60px]">
              Confirmar Senha</label
            >
            <div class="flex mt-1 items-stretch">
              <span class="flex-none input-group-addon">
                <span
                  class="bg-white transition duration-300 ease-in-out flex items-center justify-center px-3 border border-slate-200 text-slate-400 text-base font-light h-full"
                >
                  <Icon :icon="icons.passwordIcon" />
                </span>
              </span>
              <div class="flex-1">
                <div class="relative fromGroup2">
                  <input
                    v-model="user.password_confirmation"
                    name="multi_password"
                    label="Confirmar Senha"
                    type="password"
                    placeholder="Confirmar a Senha"
                    class="bg-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0 placeholder:text-slate-400 text-slate-900 text-sm px-3 placeholder:font-light focus:border-slate-600 block w-full focus:outline-none h-[40px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid xl:grid-cols-2 grid-cols-1 mt-4 gap-5">
          <AutoCompleteTenant
            :tenantId="user.tenant_id"
            :updateTenantId="updateTenantId"
          />
          <div>
            <div
              class="grid gap-1 text-slate-900 md:grid-cols-1 grid-cols-1 mb-2"
            >
              <label class="text-sm mt-1">Manter usuário ativo? </label>
              <Switch
                v-model="user.is_active"
                :class="is_active ? 'bg-sky-800' : 'bg-slate-600'"
                class="relative mt-1 inline-flex h-[18px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                <span class="sr-only text-cyan-300"></span>
                <span
                  aria-hidden="true"
                  :class="user.is_active ? 'translate-x-4' : '-translate-x-0.5'"
                  class="pointer-events-none inline-block h-[18px] -mt-0.5 w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
              </Switch>
            </div>
          </div>
        </div>

        <!-- Botão de envio -->
      </form>

      <div class="grid xl:grid-cols-1 grid-cols-">
        <div class="justify-self-end xl:mt-0 mt-4">
          <div class="text-right mt-6">
            <button
              @click="handleSubmit"
              :class="!userStore.isLoading ? '' : 'opacity-50'"
              class="inline-flex mt-5 transition-all duration-150 items-center justify-center rounded capitalize border border-transparent hover:ring-2 hover:ring-opacity-80 ring-black-900 hover:ring-offset-1 ring-slate-950 bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-1 focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 sm:w-auto"
            >
              <div
                v-if="!userStore.isLoading"
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
                <span v-if="userStore.idDeleteOrUpdate === ''"
                  >ADICIONAR USUÁRIO</span
                ><span v-else>ATUALIZAR USUÁRIO</span>
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
