import { defineStore } from "pinia";
import { ref } from "vue";

export const useInitial = defineStore("initial", () => {
  const isInitialized = ref<boolean>();

  const setIsInitialized = (value: boolean) => {
    isInitialized.value = value;
  };

  return {
    isInitialized,
    setIsInitialized,
  };
});
