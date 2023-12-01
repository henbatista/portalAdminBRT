import { ref } from "vue";

export default function useApiUrl() {
  const homolog = ref(false);

  const getApiUrl = () => {
    return homolog.value
      ? "https://back.brtoperadora.com.brr"
      : "https://back.brtoperadora.com.br";
  };

  return {
    getApiUrl,
    homolog,
  };
}
