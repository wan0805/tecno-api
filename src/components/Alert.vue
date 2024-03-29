<script setup>
import { useTecnoStore } from "../stores/tecno.js";

const store = useTecnoStore();

const props = defineProps(["item"]);
</script>
<template>
  <div class="alert" :class="{ active: store.isActiveAlert }">
    <p class="alert__message">{{ props.item }} foi adicionado ao carrinho!</p>
  </div>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 20px;
  left: 6px;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: none;
}
.alert.active {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0px, -30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.alert__message {
  background: #ffffff;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid black;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
../stores/tecno.js
