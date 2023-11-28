<template>
    
    <div :id="props.inputId" class="mt-4 flex flex-col gap-2">
      <p class="mt-1 text-sm font-bold">
        {{ props.label }} <span v-if="props.mandatory" class="text-red-500 text-xs">(Obrigatório)</span>
      </p>
      <div class="relative w-full flex">
        <input
        type="file"
        class="hidden"
        :ref="props.inputRef"
        :id="props.inputId"
        :accept="props.accept"
        @change="handleChange"
        />
        <label
        :for="props.inputId" @click="() => triggerFileInput(props.inputRef)"
          class="w-full h-[40px] file-control flex items-center  rounded-sm b g-white transition duration-300 ease-in-out border border-slate-200 focus:ring-0  focus:outline-none  
          t text-sm pl-3  placeholder:font-light focus:border-slate-600 cursor-pointer bg-slate-100 text-slate-900 text-center px-4 py-2 rounded-l-lg "
        >
          Buscar arquivo
        </label>
        <span :id="props.fileNameId" class="p-2 border w-2/3 h-10  flex-none cursor-pointer border-l px-4 border-slate-200   inline-flex items-center  text-slate-600 text-base rounded-tr rounded-br font-normal">{{ props.fileName }}</span>
      </div>
      <p class="mt-1 text-xs">{{ props.fileHint }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps<{
    inputId: string;
    inputRef: string;
    label: string;
    mandatory: boolean;
    accept: string;
    fileNameId: string;
    fileName: string;
    fileHint: string;
    onChange: (event: Event) => void;
    triggerFileInput: () => void;
  }>();
  
  const handleChange = (event: Event) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };

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

const triggerFileInput = (refKey: string) => {
  const inputRef = inputMap[refKey];
  if (inputRef && inputRef.value) {
    inputRef.value.click();
  }
};
  </script>
  
  <style scoped>
  /* Add your component styles here */
  </style>
  