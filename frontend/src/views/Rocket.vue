<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import FalconHeavy from '../components/FalconHeavy.vue';
import RocketInfo from '../components/RocketInfo.vue';
import { userStore } from '../stores/user';
import { useRouter, useRoute } from 'vue-router'
const route = useRoute();
const usr = userStore();

let loaded = ref(false);

let rocket = ref();

function loadData(id){
  axios.get('https://api.spacexdata.com/v4/rockets/'+id)
  .then(function (response) {
    // handle success
    rocket.value = response.data;
    loaded.value = true;
  })

  console.log(rocket.value);
}

onMounted(() => {
  loadData(route.params.id);
})
watch(route, () =>{loadData(route.params.id)})

</script>

<template>
  <main>
    <div v-if="loaded">
      <RocketInfo :rocket="rocket"/>
      <FalconHeavy :rocket="rocket" />
    </div>
  </main>
</template>
