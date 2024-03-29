<script setup>
import { ref, onMounted, computed } from "vue";
import { useTecnoStore } from "@/stores/tecno.js";
import Alert from "@/components/Alert.vue";

import useFormaterToPrice from "@/composables/formaterNumberToPrice";

const props = defineProps(["product"]);

const store = useTecnoStore();

let productDetail = ref([]);

onMounted(async () => {
  productDetail.value = await store.getProductApi(props.product);
});

function closeProductModal() {
  store.isActiveModal = false;
}
function closeModal({ target, currentTarget }) {
  if (target === currentTarget) {
    store.isActiveModal = false;
  }
}
function addItemToCart() {
  productDetail.value.estoque--;
  const { id, nome, preco, estoque } = productDetail.value;
  store.cart.push({ id, nome, preco, estoque });
  SetlocalStorage();
  alert();
}

function SetlocalStorage() {
  window.localStorage.setItem("cart", JSON.stringify(store.cart));
}

function alert() {
  store.isActiveAlert = true;
  setTimeout(() => {
    store.isActiveAlert = false;
  }, 1500);
}
/* function compararestoque(produto, estoque) {
  items.value = store.cart.filter(({ id }) => id === produto);
  estoque -= items.value.length
    if(items.value);
} */
</script>
<template>
  <div
    class="modal__wrapper"
    :class="{ active: store.isActiveModal }"
    v-if="props.product"
    @click="closeModal">
    <section class="product">
      <figure class="product__picture">
        <img :src="productDetail.img" :alt="productDetail.nome" />
      </figure>
      <div class="product__information">
        <router-link
          class="product__close"
          :to="{ name: 'home' }"
          @click="closeProductModal"
          >X</router-link
        >
        <span class="product__price">{{
          useFormaterToPrice(productDetail.preco)
        }}</span>
        <h2 class="product__title">{{ productDetail.nome }}</h2>
        <p class="product__description">{{ productDetail.descricao }}</p>
        <button
          v-if="productDetail.estoque > 0"
          class="product__button"
          @click="addItemToCart()">
          Adicionar Item
        </button>
        <button v-else class="product__button product__button--empty" disabled>
          Produto Esgotado
        </button>
      </div>
      <div class="reviews__wrapper">
        <h2 class="reviews__title">Avaliações</h2>
        <ul>
          <li v-for="review in productDetail.reviews" class="review">
            <p class="review__description">{{ review.descricao }}</p>
            <p class="review__user">
              {{ review.nome }} | {{ review.estrelas }} estrelas
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
  <Alert :item="productDetail.nome" />
</template>

<style scoped>
.modal__wrapper::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.modal__wrapper {
  display: none;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
}
.modal__wrapper.active {
  display: flex;
}

.product {
  position: relative;
  background: linear-gradient(to right, transparent 250px, white 250px);
  z-index: 1;
  display: grid;
  align-items: end;
  grid-gap: 50px;
  padding: 50px 50px 50px 0;
  margin-top: 60px;
  animation: fadeIn 0.3s forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.product__picture {
  max-width: 300px;
  grid-column: 1;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
.product__picture img {
  width: 100%;
  display: block;
}
.product__close {
  border-radius: 50%;
  border: 2px solid black;
  width: 40px;
  height: 40px;
  background-color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -10px;
  right: -10px;

  text-decoration: none;
  color: black;

  font-size: 1rem;

  cursor: pointer;

  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
}
.product__information {
  grid-column: 2;
  max-width: 600px;
}
.product__title {
  font-size: 3rem;
}
.product__button {
  margin-top: 80px;
  background: #000;
  cursor: pointer;
  color: #ffffff;
  border: none;
  font-size: 1rem;
  padding: 10px 25px;
  font-family: "Noto Serif";
}
.product__button.product__button--empty {
  background: #808080;
}

.product__button:active {
  background: #808080;
}
.reviews__wrapper {
  grid-column: 2;
}

.review__title {
  font-size: 1.75rem;
}

.review {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;
}

.review__description {
  color: rgba(0, 0, 0, 0.7);
  margin: 20px 0 5px 0;
}

.review__user {
  font-weight: bold;
}
@media screen and (max-width: 900px) {
  .modal__wrapper {
    padding: 10px;
  }
  .product {
    grid-gap: 20px;
    background: #ffffff;
    padding: 10px 0;
  }
  .product__picture {
    grid-row: 2;
  }
  .product__picture img {
    width: 100%;
    max-width: initial;
  }
  .product__information {
    grid-column: 1;
    padding: 10px;
  }
  .product__button {
    margin-top: 20px;
  }
  .reviews__wrapper {
    grid-column: 1;
    padding: 10px;
  }
}
</style>
@/stores/tecno.js
