<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ plant: Object })
const emit = defineEmits(['buy'])

function handleClick() {
  console.log('Emitido desde BuyButton:', props.plant)
  emit('buy', props.plant)
}
</script>

<template>
  <button @click="handleClick">
    <slot /> <!-- Para mostrar "Buy" desde PlantCard -->
  </button>
</template>




<style lang="scss">



</style>
