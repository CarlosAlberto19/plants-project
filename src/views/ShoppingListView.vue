<script setup>
import { computed, defineProps, defineEmits } from 'vue'
import PlantCardCart from '@/components/PlantCardCart.vue'

const props = defineProps({
  shoppingList: { type: Array, required: true }
})

const emit = defineEmits(['update-card','buy'])

/* Agrupa mismas plantas y cuenta cantidades */
const grouped = computed(() => {
  const map = new Map()
  props.shoppingList.forEach(plant => {
    if (map.has(plant.id)) {
      map.get(plant.id).amount++
    } else {
      map.set(plant.id, { plant, amount: 1 })
    }
  })
  return Array.from(map.values())
})

function handleUpdateCart(plant, action) {
  emit('update-card', plant, action)
}

/* Totales */
const grandTotal = computed(() =>
  grouped.value.reduce((acc, { plant, amount }) => acc + (plant.price || 0) * amount, 0)
)

const grandTotalLabel = computed(() =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
    .format(grandTotal.value / 100) // ← si tus precios ya vienen en €, quita “/ 100”
)
</script>

<template>
  <!-- Hero/encabezado de la página de carrito -->
  <section class="cartHero">
    <!-- Blob decorativo en el fondo del hero -->
    <img class="cartHeroBlob" src="@/assets/Rectangle2.svg" alt="fondo semicircular" />

    <div class="cartHeroLeft">
      <h1>Cesta de la compra</h1>
      <p>Revisa tus plantas antes de finalizar</p>
    </div>

    <div class="cartHeroRight">
      <!-- Planta superpuesta al blob -->
      <img class="cartHeroImage" src="@/assets/relleno.svg" alt="planta" />
    </div>
  </section>

  <!-- Cuerpo: lista + resumen -->
  <div class="cartPage">
    <!-- Columna izquierda: tarjetas -->
    <div class="cartPageItems">
      <PlantCardCart
        v-for="item in grouped"
        :key="item.plant.id"
        :plant="item.plant"
        :amount="item.amount"
        @update-card="handleUpdateCart"
      />
    </div>

    <!-- Columna derecha: resumen -->
    <aside class="cartSummary">
      <div class="cartSummaryHeader">
        <h2>Cesta de la compra</h2>
        <img src="@/assets/big-plant.png" alt="Decoración" class="cartSummaryImage" />
      </div>

      <div class="cartSummaryTotal">
        <span>Precio final:</span>
        <strong>{{ grandTotalLabel }}</strong>
      </div>

      <button
        class="cartSummaryBuyBtn"
        :disabled="!grouped.length"
        @click="$emit('buy')"
      >
        Comprar
      </button>
    </aside>
  </div>
</template>

<style lang="scss" scoped>
/* =========================
   HERO (cabecera del carrito)
   ========================= */
.cartHero {
  width: 1248px;
  height: 242px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 250px; /* texto | zona visual */
  align-items: center;
  gap: 2rem;
  background: #c1dcdc;
  padding: 1.25rem 1.75rem;
  min-height: 282px;
  overflow: hidden;

  .cartHeroBlob {
    position: absolute;
    z-index: 0;
    width: 500px;
    height: 800px;
    left: 38%;
    top: 62%;
    transform: translate(45%, -40%);
    pointer-events: none;
  }



  .cartHeroRight {
    position: relative;
    z-index: 1;
    height: 100px;
    display: grid;
    place-items: end center;
    overflow: visible;
    transform: translateX(-50%) translateY(-18%)
  }

  .cartHeroImage {
    position: relative;
    z-index: 18;
    width: 350px;
    height: 270px;
    pointer-events: none;
    transform: scaleX(-1.70) translate(15%) ;
  }
}

/* =========================
   GRID principal (lista + resumen)
   ========================= */
.cartPage {
  display: grid;
  grid-template-columns: (1fr  1fr);
  gap: 2rem;
  padding: 2rem 0;
  align-items: start;

  .cartPageItems {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

/* =========================
   Tarjeta de resumen
   ========================= */
.cartSummary {
  background: #f4f7f6;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  .cartSummaryHeader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 { font-size: 1.2rem; margin: 0; }
  }

  .cartSummaryImage { width: 60px; height: auto; }

  .cartSummaryTotal {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.1rem;
    font-weight: bold;

    span   { color: #333; }
    strong { margin-left: 1rem; color: #222; }
  }

  .cartSummaryBuyBtn {
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

/* =========================
   Responsive
   ========================= */

</style>

