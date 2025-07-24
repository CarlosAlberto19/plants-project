<script setup>
import PlantList from '@/components/PlantList.vue';

const emit = defineEmits(['buy'])

const plantList = [
  { id: 1, name: "Snake Plant", type: "indoor", price: 1200, image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Fiddle Leaf Fig", type: "indoor", price: 3500, image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Aloe Vera", type: "succulent", price: 900, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Pothos", type: "indoor", price: 950, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Peace Lily", type: "indoor", price: 1100, image: "https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Monstera", type: "indoor", price: 3000, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "Bamboo Palm", type: "indoor", price: 1700, image: "https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Cactus", type: "succulent", price: 700, image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Spider Plant", type: "indoor", price: 850, image: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "ZZ Plant", type: "indoor", price: 1400, image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Rubber Plant", type: "indoor", price: 1600, image: "https://images.unsplash.com/photo-1516873240894-1c1edee28d43?auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "Jade Plant", type: "succulent", price: 950, image: "https://images.unsplash.com/photo-1438109491414-7198515b166b?auto=format&fit=crop&w=400&q=80" }
];

function handleBuy(plant) {
  emit('buy', plant)
  

}


</script>

<template>



  <br><br><br>
   <!--h2>Total plants: {{ plantList.length }}</h2> -->


  <PlantList :plantList="plantList"
   @buy="handleBuy"
    />




</template>




<style lang="scss" scoped>






</style>
