<script setup>
import { defineProps, defineEmits } from 'vue'

/* 1. props */
const props = defineProps({
plant: { type: Object, required: true },
shoppingList: { type: Array, required: true }
})

/* 2. emits (“update-card” basta) */
const emit = defineEmits(['update-card'])

/* 3. botones */
function handleAdd () {
emit('update-card', props.plant, 'add') // App.vue hará push()
}

function handleRemove () {
emit('update-card', props.plant, 'remove') // App.vue hará splice()
}

/* 4. función amount() – cuenta duplicados */
function amount () {
return props.shoppingList.filter(
p => p.id === props.plant.id
).length
}
</script>


<template>
<div class="plant-card-cart">
<!-- datos de la planta -->
<img :src="plant.image" :alt="plant.name" class="plant-image" />
<h3>{{ plant.name }}</h3>
<p>{{ plant.price }} €</p>

<!-- contador -->
<div class="cart-controls">
<button @click="handleRemove">−</button>
<span>{{ amount() }}</span> <!-- n se calcula al vuelo -->
<button @click="handleAdd">＋</button>
</div>
</div>
</template>

<style scoped lang="scss">
.plant-card-cart {
max-width: 18rem;
display: flex;
flex-direction: column;
align-items: center;
padding: 1rem;
border: 1px solid #ddd;
border-radius: 0.5rem;
gap:10px;
}

.plant-image {
width: 100%;
height: auto;
border-radius: 0.25rem;
}
</style>
