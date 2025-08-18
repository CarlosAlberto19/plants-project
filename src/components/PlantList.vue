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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  gap: 2rem;
}
</style>
