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


const grandTotal = computed(() => {
  return grouped.value.reduce((acc, item) => {

    return acc + item.plant.price * item.amount
  } , 0)

})

const grandTotalLabel = computed(() => {
  return new Intl.NumberFormat('es-Es',{
    style: 'currency',
    currency:'EUR'

  }).format(grandTotal.value)


})




function handleUpdateCart(plant, action) {
  emit('update-card', plant, action)
}


</script>



<template>
<div class="shopping-list-view">
<!-- 🌿 Columna izquierda con tarjetas -->
<div class="plant-cards">
<PlantCardCart
v-for="item in grouped"
:key="item.plant.id"
:plant="item.plant"
:amount="item.amount"
@update-card="handleUpdateCart"
/>
</div>

<!-- 💳 Columna derecha con resumen -->
<aside class="summary">
<div class="summary-header">
<h2>Cesta de la compra</h2>
<img src="@/assets/big-plant.png" alt="Decoración" class="summary-image" />
</div>

<div class="summary-total">
<span>Precio final:</span>
<strong>{{ grandTotalLabel }}</strong>
</div>

<button class="buy-btn" :disabled="!grouped.length" @click="$emit('buy')">
Comprar
</button>
</aside>
</div>
</template>


<style lang="scss">
.shopping-list-view {
display: grid;
grid-template-columns: 2fr 1fr; // 🌿 izquierda 2/3, 🧾 derecha 1/3
gap: 2rem;
padding: 2rem;
}

.plant-cards {
display: flex;
flex-direction: column;
gap: 1rem;
}

.summary {
background: #f4f7f6;
padding: 1.5rem;
border-radius: 1rem;
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1rem;

.summary-header {
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;

h2 {
font-size: 1.4rem;
margin: 0;
}

.summary-image {
width: 60px;
height: auto;
}
}

.summary-total {
display: flex;
justify-content: space-between;
width: 100%;
font-size: 1.2rem;
font-weight: bold;

span {
color: #333;
}

strong {
margin-left: 1rem;
color: #222;
}
}

.buy-btn {
align-self: center;
background-color: #c0d6d1;
padding: 0.5rem 1rem;
font-weight: bold;
border: none;
border-radius: 0.4rem;
cursor: pointer;
transition: background-color 0.2s;

&:disabled {
background-color: #ccc;
cursor: not-allowed;
}
}
}



</style>
