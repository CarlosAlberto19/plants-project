<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['search'])
const searchTerm = ref('')

function handleInput() {
emit('search', searchTerm.value)
}
</script>

<template>
<div class="search-bar">
<input
type="text"
v-model="searchTerm"
@input="handleInput"
placeholder="Buscar planta..."
/>
</div>
</template>

<style scoped lang="scss">
.search-bar {
display: flex;
justify-content: center;
margin-bottom: 1rem;

input {
padding: 0.5rem 1rem;
font-size: 1rem;
width: 100%;
max-width: 400px;
border: 1px solid #ccc;
border-radius: 0.5rem;
outline: none;
transition: border-color 0.3s;

&:focus {
border-color: #42b983;
}
}
}
</style>


<style lang="scss">


.search-box {
display: grid;
grid-template-columns: 1.5rem 1fr auto;
align-items: center;
gap: 0.5rem;
padding: 0.5rem 0.75rem;
border: 1px solid #cfd8dc;
border-radius: 0.5rem;
background: #fff;
max-width: 560px;
width: 100%;
}

.icon {
opacity: 0.7;
line-height: 1;
}

.search-input {
border: none;
outline: none;
font-size: 1rem;
width: 100%;
}

.clear-btn {
border: none;
background: #e0e0e0;
border-radius: 0.35rem;
width: 1.6rem;
height: 1.6rem;
line-height: 1.6rem;
text-align: center;
cursor: pointer;
}
.clear-btn:hover { background: #d5d5d5; }
</style>




