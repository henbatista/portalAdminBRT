import { ref } from "vue";

export default function useApiUrl() {
  const homolog = ref(true);

  const getApiUrl = () => {
    return homolog.value
      ? "https://back.brtoperadora.com.br"
      : "https://back.brtoperadora.com.br";
  };

  return {
    getApiUrl,
    homolog,
  };
}
