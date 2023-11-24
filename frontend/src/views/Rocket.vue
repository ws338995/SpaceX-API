<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import FalconHeavy from '../components/FalconHeavy.vue';
import RocketInfo from '../components/RocketInfo.vue';
import { userStore } from '../stores/user';
import { useRouter, useRoute } from 'vue-router'
import Falcon9 from '../components/Falcon9.vue';
const route = useRoute();
const usr = userStore();

let loaded = ref(false);
let id = ref('');

let rocket = ref();

function loadData(_id){
  id.value = _id;
  axios.get('https://api.spacexdata.com/v4/rockets/'+_id)
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
//="id='5e9d0d95eda69973a809d1ec'"
</script>

<template>
  <main>
    <div v-if="loaded">
      <RocketInfo :rocket="rocket"/>
      <FalconHeavy v-if="id=='5e9d0d95eda69974db09d1ed'" :rocket="rocket" />
      <Falcon9 v-else :rocket="rocket" />
    </div>
  </main>
</template>
