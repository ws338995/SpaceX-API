<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import { userStore } from '../stores/user';
import { useRouter, useRoute } from 'vue-router'
import router from '../router';
import Chip from '../components/Chip.vue';
const route = useRoute();
const usr = userStore();

let loaded = ref(false);

let crew = ref();

function loadData(id){
  axios.get('https://api.spacexdata.com/v4/crew/'+id)
  .then(function (response) {
    // handle success
    crew.value = response.data;
    loaded.value = true;
  })

  console.log(crew.value);
}

onMounted(() => {
  loadData(route.params.id);
})
watch(route, () =>{loadData(route.params.id)})

</script>

<template>
  <main>
    <div v-if="loaded" class="crewInfoBox">
      <img :src="crew.image" alt="Portait"/>
      <div class="content-text">
        <h3 style="display:inline-block">{{ crew.name }}</h3>
        <div style="display:inline-block; float:right; display:flex">
          <Chip :text="crew.agency" outlined color="white"/>
          <Chip v-if="crew.active" text="Active" color="green" outlined/>
          <Chip v-else text="Not Active" color="red" outlined/>
        </div>
      </div>
      <hr/>
      <div class="content-text">
        <h3><a :href="crew.wikipedia">Wikipedia Page</a></h3>
      </div>
      <hr/>
      <div class="content-text" v-if="crew.launches">
        <h3>Launches</h3>
        <Chip style="margin:10px" selectable @click="router.push('/launch/'+l)" v-for="(l,i) in crew.launches" :key="i" :text="'Launch '+(i+1)" outlined color="white"/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.crewInfoBox{
  position: absolute;
  margin: auto;
  width:90vw;
  max-width: 500px;
  height:fit-content;
  left:0;right:0;top:0;bottom:0;
  border-left:2px solid orange;
  background-color: rgba(12,12,12,0.9);
}
.crewInfoBox img{
  width: 100%;

}
.content-text{
  padding-left:10px
}
</style>