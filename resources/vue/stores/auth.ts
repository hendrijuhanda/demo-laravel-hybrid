import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuth = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>();
  const user = ref<any>();
  const token = ref<string | null>(null);

  const initToken = () => {
    token.value = localStorage.getItem("token");
  };

  const setToken = (value: string | null) => {
    token.value = value;

    if (value === null) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", value);
    }
  };

  const setUser = (data: any) => {
    user.value = data;
  };

  const setIsAuthenticated = (value: boolean) => {
    isAuthenticated.value = value;
  };

  return {
    isAuthenticated,
    user,
    token,
    initToken,
    setToken,
    setUser,
    setIsAuthenticated,
  };
});
