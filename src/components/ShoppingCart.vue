<script setup>
//import { defineProps, watch } from 'vue';

defineProps({ shoppingList: Array})

/*watch(() => shoppingList.length, (newVal) => {
  console.log("Nuevo número de plantas en el carrito:", newVal);
});
*/
</script>



<template>

 <button class="shopping-cart">
    🛒

  </button>

  <span class="bubble" v-if="shoppingList.length > 0">
  {{ shoppingList.length }}
</span>


</template>




<style lang="scss">

shopping-cart{
  height: 340rem;
}

bubble{

  align-items: left;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif


}



</style>
