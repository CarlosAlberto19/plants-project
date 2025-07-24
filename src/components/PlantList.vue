<script setup>
import PlantCard from './PlantCard.vue'

const props = defineProps({
  plantList: Array,
})

const emit = defineEmits(['buy'])

function handleBuy(plant) {
  emit('buy', plant) // Propaga hacia App.vue
}

</script>

<template>
  <div class="plant-list">
    <PlantCard
      v-for="plant in props.plantList"
      :key="plant.id"
      :plant="plant"
      @buy="handleBuy"
    />
  </div>
</template>

<style lang="scss">
.plant-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}
</style>
