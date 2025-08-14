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
  <section class="cart-hero">
    <!-- Blob decorativo en el fondo del hero -->
    <img class="cart-hero__blob" src="@/assets/Rectangle2.svg" alt="fondo semicircular" />

    <div class="cart-hero__left">
      <h1>Cesta de la compra</h1>
      <p>Revisa tus plantas antes de finalizar</p>
    </div>

    <div class="cart-hero__right">
      <!-- Planta superpuesta al blob -->
      <img class="cart-hero__image" src="@/assets/relleno.svg" alt="planta" />
    </div>
  </section>

  <!-- Cuerpo: lista + resumen -->
  <div class="cart-page">
    <!-- Columna izquierda: tarjetas -->
    <div class="cart-page__items">
      <PlantCardCart
        v-for="item in grouped"
        :key="item.plant.id"
        :plant="item.plant"
        :amount="item.amount"
        @update-card="handleUpdateCart"
      />
    </div>

    <!-- Columna derecha: resumen -->
    <aside class="cart-summary">
      <div class="cart-summary__header">
        <h2>Cesta de la compra</h2>
        <img src="@/assets/big-plant.png" alt="Decoración" class="cart-summary__image" />
      </div>

      <div class="cart-summary__total">
        <span>Precio final:</span>
        <strong>{{ grandTotalLabel }}</strong>
      </div>

      <button
        class="cart-summary__buy-btn"
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
.cart-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 420px; /* texto | zona visual */
  align-items: center;
  gap: 2rem;
  background: #c1dcdc;
  border-radius: 16px;
  padding: 1.5rem 2rem;
  min-height: 360px;          /* ↑ más alto para que no se corte la mano */
  overflow: visible;           /* que se vea todo lo decorativo */

  /* Semicírculo negro */
  &__blob {
    position: absolute;
    z-index: 0;
    width: 500px;              /* ↑ más grande para el look final */
    height: 500px;
    left: 56%;                 /* ligera deriva a la derecha */
    top: 62%;                  /* más abajo para que asomen hojas */
    transform: translate(-50%, -50%);  /* centra respecto a ese punto */
    pointer-events: none;
  }

  &__left {
    position: relative;
    z-index: 1;
    h1 { margin: 0 0 0.25rem 0; }
    p  { margin: 0; opacity: 0.9; }
  }

  &__right {
    position: relative;
    z-index: 1;
    min-height: 300px;         /* asegura alto suficiente para la planta */
    display: grid;
    place-items: end center;
    overflow: visible;
  }

  /* Planta + mano */
  &__image {
    position: relative;
    z-index: 2;                /* por encima del blob */
    width: 280px;              /* ↑ un poco más grande */
    height: auto;
    transform: translate(22%, 12%); /* derecha y abajo */
    pointer-events: none;
  }
}

/* =========================
   GRID principal (lista + resumen)
   ========================= */
.cart-page {
  display: grid;
  grid-template-columns: 2fr 1fr; /* izquierda 2/3, derecha 1/3 */
  gap: 2rem;
  padding: 2rem 0;
  align-items: start;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

/* =========================
   Tarjeta de resumen
   ========================= */
.cart-summary {
  background: #f4f7f6;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 { font-size: 1.2rem; margin: 0; }
  }

  &__image { width: 60px; height: auto; }

  &__total {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 1.1rem;
    font-weight: bold;

    span   { color: #333; }
    strong { margin-left: 1rem; color: #222; }
  }

  &__buy-btn {
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
@media (max-width: 960px) {
  .cart-hero {
    grid-template-columns: 1fr;    /* apila texto y visual */
    min-height: 300px;

    &__blob {
      width: 360px;
      height: 360px;
      left: 50%;
      top: 58%;
      transform: translate(-50%, -50%);
    }

    &__right { place-items: center; min-height: 240px; }
    &__image { width: 240px; transform: translate(0, 0); }
  }

  .cart-page {
    grid-template-columns: 1fr;    /* apila lista + resumen */
  }
}
</style>
