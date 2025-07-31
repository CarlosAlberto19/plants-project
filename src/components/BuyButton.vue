<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ plant: Object })
const emit = defineEmits(['update-card'])

function handleClick() {
  console.log('Emitido desde BuyButton:', props.plant)
  emit('update-card', props.plant, 'add')
}
</script>

<template>
  <button @click="handleClick">
    <slot /> <!-- Para mostrar "Buy" desde PlantCard -->
  </button>
</template>




<style lang="scss">



</style>
