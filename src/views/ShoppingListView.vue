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
v-for="(plant, idx) in props.shoppingList"
:key="plant.id || idx"
:plant="plant"
@update-card="(payload , action) =>
  handleUpdateCart(action === 'remove' ? idx: payload,
    action
)"
  )
/>
</template>

<style lang="scss">
.about {
  margin-top: 2rem;
}
</style>
