<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['search'])
const searchTerm = ref('')

function handleInput(event) {
emit('search', event.target.value)
}
</script>

<template>
  <div class="searchbar-wrapper">
    <div class="search-bar">
      <input
        type="text"
        v-model="searchTerm"
        @input="handleInput"
        placeholder="What are you looking for"
        />
          <span class=" search-icon">🔍</span>
</div>
</div>
</template>

<style scoped lang="scss">

.searchbar-wrapper {
position: relative;
width: 100%;
max-width: 450px;
height: 64px;
background-color: white;
border-radius: 12px;
display: flex;
align-items: center;
padding-left: 1rem;
}

.search-bar {
display: flex;
align-items: center;
width: 100%;
height: 100%;
padding-right: 60px; // espacio para la lupa
position: relative;
}

.search-bar input {
width: 100%;
height: 100%;
padding: 0 1rem;
font-size: 1rem;
border: none;
outline: none;
background-color: transparent;

&::placeholder {
color: #999;
font-weight: 500;
}
}

.search-icon {
position: absolute;
right: 8px;
top: 8px;
width: 48px;
height: 48px;
background-color: #C1DCDC;
border-radius: 12px;
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
cursor: pointer;
user-select: none;
}
</style>




