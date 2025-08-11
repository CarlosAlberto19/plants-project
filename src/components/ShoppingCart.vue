<script setup>
//import { defineProps, watch } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({ shoppingList: Array})

/*watch(() => shoppingList.length, (newVal) => {
  console.log("Nuevo número de plantas en el carrito:", newVal);
});
*/


const router = useRouter()

function goToCart() {
  if (props.shoppingList.length > 0) {
    router.push('/shopping')
  } else {
    alert('No has añadido ninguna planta al carrito')
  }
}

</script>



<template>
  <div class="shopping-cart" @click="goToCart">
     <img src="@/assets/Cart.svg" alt="Decoración" class="summary-image" />
    <span class="bubble" v-if="shoppingList.length > 0">
      {{ shoppingList.length }}
    </span>
  </div>
</template>



<style scoped lang="scss">
.shopping-cart{
  position: relative;
  display: inline-block;
  /* si el icono “baila”, fija un tamaño: */
  /* width: 40px; height: 40px; */
  padding: 0;               /* evita que empuje a la burbuja */
  line-height: 0;
}


.summary-image{
  display:block;
  width:100%;
  height:100%;
}

.bubble{
  position: absolute;
  /* ANCLA: esquina inferior derecha del icono */
  bottom: var(--by, 0);
  right:  var(--bx, 0);

  /* Sácala un poco hacia fuera para que se “pegue” a la rueda */
  transform: translate(var(--tx, 35%), var(--ty, 35%));

  /* Estilos visuales */
  min-width: 1.1rem;
  height: 1.1rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  display: grid;
  place-items: center;
  line-height: 1;
  font-size: 0.9rem;
  font-weight: 700;
  background: #C1DCDC;
  color: #000;
  z-index: 2;
  pointer-events: none;
  font-family: inherit; /* no cambio tu fuente */

}

</style>
