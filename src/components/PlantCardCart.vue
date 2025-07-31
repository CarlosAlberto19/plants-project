<script setup>

const props = defineProps({ plant: Object })

const emit = defineEmits(['update-card'])

function handleRemove(){
  emit('update-card' , props.plant, 'remove')
}

</script>


<template>

  <div class="plant-card-cart">
    <img :src="plant.image" :alt="plant.name" class="plant-image"> />
    <h3> {{ plant.image }}</h3>
    <p>{{ plant.price }}</p>

    <button @click="handleRemove">
      Eliminar

    </button>
  </div>

</template>


<style lang="scss">


</style>

