<script setup>
//import { defineProps, watch } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({ shoppingList: Array})

/*watch(() => shoppingList.length, (newVal) => {
  console.log("Nuevo número de plantas en el carrito:", newVal);
});
*/


const router = useRouter()

function goToCart() {
  if (props.shoppingList.length > 0) {
    router.push('/shopping')
  } else {
    alert('No has añadido ninguna planta al carrito')
  }
}

</script>



<template>
  <div class="shopping-cart" @click="goToCart">
    🛒
    <span class="bubble" v-if="shoppingList.length > 0">
      {{ shoppingList.length }}
    </span>
  </div>
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
  background-color: #C1DCDC;
  color: black;
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  border-radius: 50%;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  transform:translateY(100%)
}
</style>
