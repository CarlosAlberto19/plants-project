<script setup>
import BuyButton from './BuyButton.vue'


const props = defineProps({ plant: Object })
const emit = defineEmits(['update-card'])

function handleBuy(plant, action) {
  emit('update-card', plant, action)
}
</script>

<template>
  <div class="plant-card">
    <img
      :src="props.plant.image"
      :alt="props.plant.name"
      class="plant-image"
    />
    <h2>{{ props.plant.name }}</h2>
    <p class="plant-type">{{ props.plant.type }}</p>
    <p class="plant-price">₱ {{ props.plant.price }}</p>

    <!-- Escucha el evento 'buy' del botón y llama a handleBuy -->
    <BuyButton
      :plant="props.plant"
      @update-card="handleBuy"
      class="buy-btn"
    >
      Buy
    </BuyButton>
  </div>
</template>


<style lang="scss">
.plant-card {
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0002;
  padding: 1.2rem;
  height: 499px;
  width: 299.33px;
  text-align: center;
  transition: box-shadow 0.2s;
}

.plant-card:hover {
  box-shadow: 0 8px 24px #4aafbf33, 0 2px 8px #0002;
}

.plant-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  height: 350px;
}

.plant-type {
  font-size: 1rem;
  color: #6c757d;
}

.plant-price {
  font-size: 1.1rem;
  color: #7cc380;
  font-weight: bold;
}

.buy-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: #94e9af;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.buy-btn:hover {
  background: hwb(149 20% 24% / 0.716);
  color: #fff;
}
</style>
