<script setup>
//import { defineProps, watch } from 'vue';

defineProps({ shoppingList: Array})

/*watch(() => shoppingList.length, (newVal) => {
  console.log("Nuevo número de plantas en el carrito:", newVal);
});
*/
</script>



<template>
  <RouterLink to="/about" class="shopping-cart">
    🛒
    <span class="bubble" v-if="shoppingList.length > 0">
      {{ shoppingList.length }}
    </span>
  </RouterLink>
</template>




<style scoped lang="scss">
.shopping-cart {
  position: relative;
  display: inline-block;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
}

.bubble {
  position: absolute;
  top: 0;
  right: 0;
  background-color: crimson;
  color: white;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
