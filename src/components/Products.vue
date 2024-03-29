<script setup>
import { ref, onMounted } from "vue";
import { useTecnoStore } from "@/stores/tecno.js";
import useFormaterToPrice from "@/composables/formaterNumberToPrice";
import ProductModal from "@/components/modal/ProductModal.vue";

const store = useTecnoStore();
const products = ref();

const productSelected = ref();

function getProductSelected(event) {
  productSelected.value = event;
  store.isActiveModal = true;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(async () => {
  products.value = await store.getProductsApi();
});
</script>
<template>
  <section class="products__wrapper">
    <router-link
      :to="{
        name: 'ProductModal',
        params: { name: product.nome },
      }"
      class="products__card"
      v-for="product in products"
      :key="product.id"
      @click="getProductSelected(product.id)">
      <img :src="product.img" :alt="product.nome" class="product__image" />
      <div class="product__information">
        <span class="product__price">{{
          useFormaterToPrice(product.preco)
        }}</span>
        <h2 class="product__title">{{ product.nome }}</h2>
      </div>
    </router-link>
  </section>
  <teleport to="body">
    <ProductModal
      v-if="productSelected && store.isActiveModal"
      :product="productSelected" />
  </teleport>
</template>

<style scoped>
.products__wrapper {
  max-width: 900px;
  margin: 100px auto 0 auto;
}
.products__card {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  background: #ffffff;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.1);

  text-decoration: none;
  color: black;

  cursor: pointer;
}
.product__image {
  max-width: 300px;
  margin-right: 40px;
}
.product__title {
  font-size: 3rem;
  line-height: 1;
}
.product__price {
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 900px) {
  .products__wrapper {
    margin-top: 40px;
  }
  .products__card {
    flex-direction: column;
    align-items: flex-start;
    max-width: 300px;
    margin: 30px auto;
  }
  .product__information {
    padding: 20px;
  }
  .product__image {
    max-width: 100%;
  }
  .product__title {
    font-size: 1.5rem;
  }
}
</style>
../stores/tecno.js
