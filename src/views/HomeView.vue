<script setup>
import { ref, onMounted, computed } from 'vue'
import PlantList from '@/components/PlantList.vue'
import SearchBar from '@/components/SearchBar.vue'

const emit = defineEmits(['update-card'])

const searchTerm = ref('')
const plantList = ref([])

const loading = ref(false)
const error = ref(null)

const API_BASE = import.meta.env.VITE_API_URL || '[http://localhost:3000](http://localhost:3000/)'

const filteredPlantList = computed(() => {
  const q =searchTerm.value.trim().toLocaleLowerCase()
  if (!q) return plantList.value
  return plantList.value.filter(p => p.name?.toLocaleLowerCase().includes(q))
})

async function fetchPlants(term = '') {
  loading.value = true
  error.value = null
  try {
    const url = term ? `${API_BASE}/plants?q=${encodeURIComponent(term)}` : `${API_BASE}/plants`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    plantList.value = Array.isArray(data) ? data : []
  } catch (e) {
    error.value = e.message || 'Fetch error'
    if (plantList.value.length === 0) {
      plantList.value = [
        {
          id: 1,
          name: 'Snake Plant',
          type: 'indoor',
          price: 1200,
          image:
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 2,
          name: 'Fiddle Leaf Fig',
          type: 'indoor',
          price: 3500,
          image:
            'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 3,
          name: 'Aloe Vera',
          type: 'succulent',
          price: 900,
          image:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 4,
          name: 'Pothos',
          type: 'indoor',
          price: 950,
          image:
            'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 5,
          name: 'Peace Lily',
          type: 'indoor',
          price: 1100,
          image:
            'https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 6,
          name: 'Monstera',
          type: 'indoor',
          price: 3000,
          image:
            'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 7,
          name: 'Bamboo Palm',
          type: 'indoor',
          price: 1700,
          image:
            'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 8,
          name: 'Cactus',
          type: 'succulent',
          price: 700,
          image:
            'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 9,
          name: 'Spider Plant',
          type: 'indoor',
          price: 850,
          image:
            'https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 10,
          name: 'ZZ Plant',
          type: 'indoor',
          price: 1400,
          image:
            'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 11,
          name: 'Rubber Plant',
          type: 'indoor',
          price: 1600,
          image:
            'https://images.unsplash.com/photo-1516873240894-1c1edee28d43?auto=format&fit=crop&w=400&q=80',
        },
        {
          id: 12,
          name: 'Jade Plant',
          type: 'succulent',
          price: 950,
          image:
            'https://images.unsplash.com/photo-1438109491414-7198515b166b?auto=format&fit=crop&w=400&q=80',
        },
      ]
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPlants()
})

let debounceId
function filterPlants(term) {
  clearTimeout(debounceId)
  debounceId = setTimeout(() => {
    searchTerm.value = term
  }, 300)
}

function handleBuy(plant) {
  emit('update-card', plant, 'add')
}


</script>
<template>
  <section class="hero-header">
    <div class="hero-left">
      <h1>
        Buy your<br />
        <span>dream plants</span>
      </h1>

      <div class="info-row">
        <div class="info-box">
          <h2>50+</h2>
          <p>Plant Species</p>
        </div>

        <div class="divider"></div>

        <div class="info-box">
          <h2>100+</h2>
          <p>Customers</p>
        </div>
      </div>

      <SearchBar class="searchbar-left" @search="filterPlants" />
    
    </div>

    <div class="hero-right">
      <img class="bg-blob" src="@/assets/Rectangle2.svg" alt="background" />
      <img class="curl" src="@/assets/Vector186.png" alt="curl" />
      <img class="curl-right" src="@/assets/Vector187.png" alt="curl-right" />

      <img class="hero-img" src="@/assets/relleno.svg" alt="plant hero" />
    </div>
  </section>

  <div class="home-view">
    <PlantList :plantList="filteredPlantList" @update-card="handleBuy" />
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  height: 100vh;
  overflow: visible;
}
.hero-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: #c1dcdc;
  height: 28rem;
  width: 1248px;

  gap: 2rem;
}

.hero-left {
  flex: 0 0 58%;
  margin-bottom: 0;
  max-width: 58%;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.2;

    span {
      font-weight: bold;
      color: #2c3e50;
    }
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;

    .info-box {
      h2 {
        font-size: 2rem;
        margin: 0;
      }
      p {
        margin: 0;
        font-size: 1rem;
      }
    }

    .divider {
      width: 2px;
      height: 40px;
      background-color: black;
    }
  }
}

.searchbar-left {
  margin-top: 3rem;
  width: 70%;
  max-width: 560px;
}

.hero-right {
  flex: 1 1 42%;
  position: relative;
  overflow: visible; //no se recorta. no hidden
  height: 518.15px;
  width: 400.54px;
  display: grid;
  place-items: center;

  background-image: url ('@/assets/Rectangle2.svg');
}
.hero-img {
  position: relative;
  z-index: 1;
  width: 78%;
  height: auto;
  transform: translateX(-3%) translateY(1%);
}

.bg-blob {
  position: absolute;
  z-index: 0;
  width: 444.02px;
  height: 358px;
  top: 24%;
  left: -7%;
  transform: none;
  align-items: center;
}

.home-view {
  padding: 2rem;
}

* {
  box-sizing: border-box;
}

.curl {
  position: absolute; // Cambiado de fixed a absolute
  z-index: 9999;
  pointer-events: none;
  width: 150px;
  top: 58%;
  left: -130px; // Ajusta según sea necesario
  transform: translate(-50%, 52%); // Ajusta según sea necesario
}

.curl-right {
  position: absolute; // Cambiado de fixed a absolute
  top: 10%;
  right: 48px; // Ajusta según sea necesario
  width: 85px;
  transform: translate(50%, 0); // Ajusta según sea necesario
}
</style>
