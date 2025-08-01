<script setup>

const props = defineProps({ plant: Object })

const emit = defineEmits(['update-card'])

function handleRemove(){
  emit('update-card' , props.plant, 'remove')
}

function handleAdd(){
  emit('update-card' , props.plant, 'add')
}

</script>


<template>
<div class="plant-card-cart">
<img
class="plant-image"
:src="props.plant.image"
:alt="props.plant.name"
/>
<h2>{{ props.plant.name }}</h2>
<h4>{{ props.plant.price }}</h4>
<!-- etc… -->
</div>
<button class="Borrar" @click="handleRemove"> Borrar</button>

<button class="Añadir planta" @click="handleAdd" > Añadir </button>
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
