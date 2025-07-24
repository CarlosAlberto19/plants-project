<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';

const shoppingList = ref([])



function handleBuy(plant) {
  shoppingList.value.push(plant)
  console.log(shoppingList.value)
}
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>


  <RouterView @buy="handleBuy"/>

</template>

<style lang="scss" scoped>
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
