<script setup>
import PlantCardCart from '@/components/PlantCardCart.vue'

const props = defineProps({ shoppingList: Array })
const emit = defineEmits(['update-card'])

function handleUpdateCart(plant, action) {
emit('update-card', plant, action)
}
</script>

<template>
<!-- 1 tarjeta PlantCardCart por cada planta del array -->
<PlantCardCart
v-for="(plant, index) in props.shoppingList"
:key="plant.id || index"
:plant="plant"
:shoppingList="shoppingList"
@update-card="handleUpdateCart"

/>
</template>

<style lang="scss">
.about {
  margin-top: 2rem;
}
</style>
