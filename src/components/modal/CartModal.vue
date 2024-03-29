<script setup>
import { useTecnoStore } from "@/stores/tecno.js";
import useFormaterToPrice from "@/composables/formaterNumberToPrice";

const store = useTecnoStore();

const props = defineProps(["priceTotal"]);

function removeProduct(index) {
  store.cart.splice(index, 1);
  SetlocalStorage();
}

function closeProductModal() {
  store.isActiveCartModal = false;
}

function SetlocalStorage() {
  window.localStorage.setItem("cart", JSON.stringify(store.cart));
}
</script>
<template>
  <section class="cart__modal" :class="{ active: store.isActiveCartModal }">
    <div class="cart__wrapper">
      <button class="cart__close" @click="closeProductModal">X</button>
      <h2 class="cart__title">Carrinho</h2>
      <div v-if="store.cart.length > 0">
        <ul class="cart__list">
          <li v-for="(item, index) in store.cart" class="cart__item">
            <p>{{ item.nome }}</p>
            <p class="cart__price">{{ useFormaterToPrice(item.preco) }}</p>
            <button class="cart__remove" @click="removeProduct(index)">
              X
            </button>
          </li>
        </ul>
        <p class="cart__total">{{ useFormaterToPrice(props.priceTotal) }}</p>
        <button class="cart__checkout">Finalizar Compra</button>
      </div>
      <p v-else>O carrinho está vazio.</p>
    </div>
  </section>
</template>

<style scoped>
.cart__modal::before {
  content: "";
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.cart__modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 20px;
  display: none;
}

.cart__modal.active {
  display: block;
}

.cart__wrapper {
  position: relative;
  margin: 80px auto;
  background: #ffffff;
  padding: 40px;
  max-width: 800px;
  animation: fadeInDown 0.3s forwards;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.cart__item {
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
}

.cart__title {
  margin-bottom: 10px;
  padding-bottom: 20px;
  border-bottom: 2px solid #000000;
}

.cart__remove {
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.cart__price {
  text-align: right;
}

.cart__total {
  text-align: right;
  padding: 10px 50px 10px 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #000;
}

.cart__close {
  border-radius: 50%;
  border: 2px solid #000;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1rem;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.cart__checkout {
  display: block;
  margin-left: auto;
  background: #000;
  cursor: pointer;
  color: #ffffff;
  font-size: 1rem;
  padding: 10px 25px;
  border: none;
  font-family: "Noto Serif";
}
@media screen and (max-width: 900px) {
  .cart__modal {
    padding: 10px;
  }
}
</style>
@/stores/tecno.js
