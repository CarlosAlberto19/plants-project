<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import ShoppingCart from './components/ShoppingCart.vue';

const shoppingList = ref([])



function handleUpdateCard(payload,action) {
  if (action ==='add'){
  shoppingList.value.push(payload)
  }
  else if (action === 'remove'){
    const idx = payload
    if (idx > -1 && idx < shoppingList.value.length) {
      shoppingList.value.splice(idx, 1)
    }



  }
  //console.log(shoppingList.value)
}
</script>

<template>
  <header>
    <ShoppingCart :shoppingList="shoppingList"/>
  </header>


  <RouterView @update-card="handleUpdateCard" :shoppingList="shoppingList" :@buy="handleBuy" />


</template>

<style lang="scss" scoped>

header {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #e0e0e0;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
