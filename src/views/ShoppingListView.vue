<script setup>
const props = defineProps({ shoppingList: Array })
</script>

<template>
  <div v-for="(plant, index) in props.shoppingList" :key="index">
    🌱 {{ plant.name }} - 💰 {{ plant.price }} €
  </div>

  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style lang="scss">
.about {
  margin-top: 2rem;
}
</style>
