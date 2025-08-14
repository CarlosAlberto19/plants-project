<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import PlantCardCart from '@/components/PlantCardCart.vue'

const props = defineProps({
shoppingList: { type: Array, required: true }
})

const emit = defineEmits(['update-card', 'buy'])

/* Agrupa por id y cuenta cuántas unidades hay de cada planta */
const grouped = computed(() => {
const map = new Map()
props.shoppingList.forEach(plant => {
if (map.has(plant.id)) map.get(plant.id).amount++
else map.set(plant.id, { plant, amount: 1 })
})
return Array.from(map.values())
})

function handleUpdateCart(plant, action) {
emit('update-card', plant, action)
}

/* Total y etiqueta formateada */
const grandTotal = computed(() =>
grouped.value.reduce((sum, { plant, amount }) => sum + plant.price * amount, 0)
)
const grandTotalLabel = computed(() =>
`${grandTotal.value.toLocaleString('es-ES')} €`
)
</script>

<template>
<!-- Header global con carrito va en App.vue -->

<!-- Tu header local de Shopping -->


<!-- Mini hero específico de Shopping (mitad de alto que el de Home) -->
<section class="slv-hero">
<div class="slv-left">
<h1>Cesta de la compra</h1>

</div>

<div class="slv-right">

<img class="slv-bg-blob" src="@/assets/blob2.png" alt="background" />
<img class="slv-hero-img" src="@/assets/plantaShoppingList.png" alt="plant hero" />

</div>
</section>

<!-- Contenido principal: lista (izda) + resumen (dcha) -->
<div class="shopping-list-view">

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

<style lang="scss" scoped>
/* ===== Header local de la vista ===== */


/* ====== Hero superior de la vista de compra ====== */
.slv-hero {
display: flex;
align-items: center;
justify-content: space-between;
gap: 1.5rem;
min-height: 220px;

/* tamaño y “píldora” */
background: #c1dcdc;
border-radius: 14px;
padding: 1.25rem 1.5rem;
min-height: 140px; /* controla la altura del bloque */
overflow: visible; /* para que la imagen/semicírculo sobresalga si hace falta */
margin: 0 1.5rem 1.5rem; /* separaciones laterales/abajo */
}

.slv-left {
flex: 1 1 60%;
}

.slv-right {
flex: 0 0 40%;
position: relative; /* ancla para posicionar los elementos decorativos dentro */
min-height: 110px; /* asegura alto mínimo */
overflow:visible;
}

/* “burbuja” negra del fondo */
.slv-big-blob {
position: absolute;
z-index: 0;
width: 420px; /* tamaño del semicírculo */
height: 420px;
right: 6%; /* lo mueves horizontalmente */
top: 20px; /* lo subes para que asomen las hojas */
pointer-events: none; /* que no interfiera con clics */
transform: translateX(150%) translateY(-50%)
}

/* planta/mano */
.slv-hero-img {
position: relative;
z-index: 1; /* por encima del blob */
width: 220px; /* tamaño de la planta */
height: auto;
transform: translateX(78%) translateY(-124%); /* ajuste fino posición */
pointer-events: none;
}

/* ====== Grid principal (lista + resumen) ====== */
.shopping-list-view {
display: grid;
grid-template-columns: 2fr 1fr;
gap: 2rem;
padding: 0 1.5rem 2rem;
}

/* columnas existentes tuyas */
.plant-cards {
display: flex;
flex-direction: column;
gap: 1rem;
}

/* caja resumen: lo que ya tienes, dejo solo los mínimos que ayudan al layout */
.summary {
background: #f4f7f6;
padding: 1.5rem;
border-radius: 1rem;
display: flex;
flex-direction: column;
gap: 1rem;
}
.summary-header {
display: flex;
align-items: center;
justify-content: space-between;
}
.summary-image { width: 60px; height: auto; }
.summary-total {
display: flex;
justify-content: space-between;
font-weight: bold;
}
.buy-btn { align-self: center; }
</style>
