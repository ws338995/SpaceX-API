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

let events = ref();

function loadData(id){
  axios.get('https://api.spacexdata.com/v4/history')
  .then(function (response) {
    // handle success
    events.value = response.data;
    loaded.value = true;
  })
}

onMounted(() => {
  loadData(route.params.id);
})
watch(route, () =>{loadData(route.params.id)})

</script>

<template>
  <main>
    <div v-if="loaded" class="eventInfoBox">
      <div class="content-text" v-for="(event,i) in events.slice().reverse()" :key="i">
        <h2 style="display:inline-block">{{ event.title }} - <span style="color:white">{{ event.event_date_utc }}</span></h2>
        <p>{{ event.details }}</p>
        <h3><a :href="event.links.article">Article</a></h3>
        <hr/>
      </div>
    </div>
  </main>
</template>

<style scoped>
.eventInfoBox{
  position: absolute;
  overflow: auto;
  margin: auto;
  width:90vw;
  height:90vh;
  left:0;right:0;top:10px;bottom:0;
  border-left:2px solid orange;
  background-color: rgba(12,12,12,0.9);
}
.eventInfoBox img{
  width: 100%;

}
.content-text{
  padding-left:10px;
  margin-bottom:20px;
}
</style>