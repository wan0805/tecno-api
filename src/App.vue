<script setup>
import Header from "../src/components/Header.vue";
import products from "../src/components/Products.vue";
import { useTecnoStore } from "./stores/tecno";

const store = useTecnoStore();

function GetlocalStorage() {
  if (window.localStorage.cart) {
    store.cart = JSON.parse(window.localStorage.cart);
  }
}

GetlocalStorage();
</script>

<template>
  <Header />
  <RouterView>
    <products />
  </RouterView>
</template>

<style></style>
