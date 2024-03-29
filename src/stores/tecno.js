import { ref } from "vue";
import { defineStore } from "pinia";

export const useTecnoStore = defineStore("tecno", () => {
  const isActiveModal = ref(true);
  const isActiveAlert = ref(false);
  const totalCart = ref(0);
  const cart = ref([]);
  const isActiveCartModal = ref(false);

  async function getProductsApi() {
    const response = await fetch("/public/produtos.json");
    const data = await response.json();
    return data;
  }

  async function getProductApi(id) {
    const response = await fetch(`/src/api/produtos/${id}/dados.json`);
    const data = await response.json();
    return data;
  }

  return {
    isActiveModal,
    isActiveAlert,
    isActiveCartModal,
    cart,
    totalCart,
    getProductsApi,
    getProductApi,
  };
});
