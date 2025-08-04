<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import PlantCardCart from '@/components/PlantCardCart.vue'

const props = defineProps({
  shoppingList: { type: Array, required: true }
})
const emit = defineEmits(['update-card'])

// 1️⃣ Agrupamos por ID y contamos cuántas de cada una hay
const grouped = computed(() => {
  const map = new Map()
  props.shoppingList.forEach(plant => {
    if (map.has(plant.id)) {
      map.get(plant.id).amount++
    } else {
      map.set(plant.id, { plant, amount: 1 })
    }
  })
  return Array.from(map.values()) // [{ plant, amount }, …]
})

function handleUpdateCart(plant, action) {
  emit('update-card', plant, action)
}
</script>

<template>
  <div class="shopping-list">
    <!-- 1 tarjeta por cada entrada agrupada -->
    <PlantCardCart
      v-for="item in grouped"
      :key="item.plant.id"
      :plant="item.plant"
      :amount="item.amount"
      @update-card="handleUpdateCart"
    />
  </div>
</template>

<style lang="scss">
.shopping-list {
  display: grid;
  gap: 1rem;
}
</style>
