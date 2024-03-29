import { createRouter, createWebHistory } from "vue-router";
import ProductModal from "@/components/modal/ProductModal.vue";
import App from "../App.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: App,
    },
    {
      path: "/#:name",
      name: "ProductModal",
      props: true,
      component: ProductModal,
    },
  ],
});

export default router;
