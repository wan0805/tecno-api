<script setup>
import { useTecnoStore } from "@/stores/tecno.js";
import useFormaterToPrice from "@/composables/formaterNumberToPrice";
import CartModal from "@/components/modal/CartModal.vue";
import { computed } from "vue";

const store = useTecnoStore();

function closeProductModal() {
  store.isActiveCartModal = true;
}
const totalCartPrice = computed(() => {
  let total = 0;
  if (store.cart.length) {
    store.cart.forEach((item) => {
      total += item.preco;
    });
  }
  return total;
});
</script>
<template>
  <header class="header">
    <img src="/src/assets/images/techno.svg" alt="tecno logo" class="logo" />
    <section class="cart__menu" @click="closeProductModal">
      {{ useFormaterToPrice(totalCartPrice) }} |{{ store.cart.length }}
    </section>
    <teleport to="body">
      <CartModal v-if="store.isActiveCartModal" :price-total="totalCartPrice" />
    </teleport>
  </header>
</template>

<style scoped>
.header {
  max-width: 900px;
  display: flex;
  justify-content: space-between;

  padding: 20px 0;
  margin: 0 auto;
}

.logo {
  width: 80px;
}
.cart__menu::after {
  content: "";
  display: inline-block;
  background: url("/src/assets/images/carrinho.svg") no-repeat center center;
  width: 25px;
  height: 25px;
}
.cart__menu {
  display: flex;
  align-items: center;

  cursor: pointer;
}
</style>
@/stores/tecno.js
