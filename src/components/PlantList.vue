<script setup>
import PlantCard from './PlantCard.vue'

const props = defineProps({
  plantList: Array,
})

const emit = defineEmits(['update-card'])

function handleUpdateCard(plant, action) {
  emit('update-card', plant, action) // Propaga hacia App.vue
}

</script>

<template>
  <div class="plant-list">
    <PlantCard
      v-for="plant in props.plantList"
      :key="plant.id"
      :plant="plant"
      @update-card="handleUpdateCard"
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
