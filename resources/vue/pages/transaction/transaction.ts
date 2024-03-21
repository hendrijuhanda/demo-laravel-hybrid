import priceFormat from "@/utils/price-format";
import { RuleObject } from "ant-design-vue/es/form";
import { ref } from "vue";

const balance = ref<number>(0);

export const useTransaction = () => {
  const setBalance = (value: number) => {
    balance.value = value;
  };

  const validateAmount = async (_rule: RuleObject, value: string) => {
    if (Number(value) > balance.value) {
      return Promise.reject("Insuficient balance!");
    } else {
      return Promise.resolve();
    }
  };

  const inputNumberFormatter = (value: any) => {
    return value ? priceFormat(value) : value;
  };

  const inputNumberParser = (value: string) => {
    return value.split(".").join("");
  };

  const inputNumberKeydown = (event: any) => {
    if (!/^[0-9\b]+$/.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
  };

  return {
    balance,
    setBalance,
    validateAmount,
    inputNumberFormatter,
    inputNumberParser,
    inputNumberKeydown,
  };
};
