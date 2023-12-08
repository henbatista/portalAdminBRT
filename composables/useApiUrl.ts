import { ref } from "vue";

export default function useApiUrl() {
  const homolog = ref(true);

  const getApiUrl = () => {
    return homolog.value
      ? "http://back.brt-repasse.com.br"
      : "https://back.brtoperadora.com.br";
  };

  return {
    getApiUrl,
    homolog,
  };
}
