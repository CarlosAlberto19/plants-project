<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps({
  plant:  { type: Object, required: true },
  amount: { type: Number, required: true }
})
const emit = defineEmits(['update-card'])

const totalPrice = computed(() => props.plant.price * props.amount)

function handleAdd() {
   emit('update-card', props.plant, 'add')
   }
function handleRemove() {
   emit('update-card', props.plant, 'remove')
   }
</script>


<template>
  <div class="plant-card-cart">
    <!-- 1. Imagen a la izquierda -->
    <img :src="plant.image" :alt="plant.name" class="plant-image" />

    <!-- 2. Contenedor de detalles a la derecha -->
    <div class="plant-details">
      <h3 class="plant-name">{{ plant.name }}</h3>
      <p class="plant-price">{{ totalPrice }} €</p>
      <div class="cart-controls">
        <button @click="handleRemove">−</button>
        <span class="cart-amount">{{ amount }}</span>
        <button @click="handleAdd">＋</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.plant-card-cart {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}

.plant-image {
  width: 120px;
  height: auto;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

.plant-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.plant-name {
  margin: 0;
  font-size: 1.25rem;
}

.plant-price {
  margin: 0;
  font-weight: bold;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.cart-controls button {
  width: 2rem;
  height: 2rem;
  border: none;
  background: #c0d6d1;
  border-radius: 0.25rem;
  font-size: 1.25rem;
  cursor: pointer;
}

.cart-amount {
  display: inline-block;
  min-width: 2rem;
  text-align: center;
  font-weight: bold;
  background: #eee;
  border-radius: 50%;
  line-height: 2rem;
}
</style>
