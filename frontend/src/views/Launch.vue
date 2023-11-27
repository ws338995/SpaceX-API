<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios';
import { userStore } from '../stores/user';
import { useRouter, useRoute } from 'vue-router'
import router from '../router';
import Chip from '../components/Chip.vue';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const route = useRoute();
const usr = userStore();

let loaded = ref(false);

let launch = ref();

function loadData(id){
  axios.get('https://api.spacexdata.com/v5/launches/'+id)
  .then(function (response) {
    // handle success
    launch.value = response.data;
    loaded.value = true;
  })

  console.log(launch.value);
}

onMounted(() => {
  loadData(route.params.id);
})
watch(route, () =>{loadData(route.params.id)})

</script>

<template>
  <main>
    <div v-if="loaded" class="launchInfoBox">
      <div class="content-text">
        <div class="generalDesc">
          <img :src="launch.links.patch.large" />
          <div>
            <h2 style="display:inline-block">{{ launch.name }}</h2>
            <p>{{ launch.details }}</p>
            <div style="display:flex; margin-top:10px;">
              <Chip :text="'Flight Number: ' + launch.flight_number" color="orange" outlined/>
              <Chip v-if="launch.success" text="Sucessful" color="green"/>
              <Chip v-else-if="launch.upcoming" text="Upcoming" color="blue"/>
              <Chip v-else text="Failed" color="red"/>
              <Chip :text="launch.date_utc.split('T')[0] + ', At: ' + launch.date_utc.split('T')[1]"/>
            </div>
            <hr/>
            <Chip text="Rocket Used" selectable outlined @click="router.push('/rocket/'+launch.rocket)" color="white"/>
            <div class="content-text" style="display:flex">
              <div v-for="(core,i) in launch.cores" :key="core.core" style="margin-right:20px">
                <hr/>
                <h3>Core {{ i + 1 }} Information</h3>
                 <Chip text="Core Used"  outlined @click="router.push('/core/'+core.core)" selectable color="orange"/>
                  <p>Flight No: {{ core.flight }}</p>
                  <p>Gridfins: {{ core.gridfins }}</p>
                  <p>Legs: {{ core.legs }}</p>
                  <p>Reused: {{ core.reused }}</p>
                  <p>Landing Attemped: {{ core.landing_attempt }}</p>
                  <p v-if="core.landing_attempt">Landing Success: {{ core.landing_success }}</p>
                  <p v-if="core.landing_attempt">Landing Type: {{ core.landing_type }}</p>
                  <Chip v-if="core.landing_attempt" text="Landing Pad"  outlined @click="router.push('/map/'+core.landpad)" selectable color="orange"/>
                </div>
              <div style="margin-right:20px">
                <hr/>
                <h3>Other Information</h3>
                 <Chip :text="'Window: ' + launch.window"  outlined  color="white"/>
                 <Chip :text="'Net: ' + launch.net" outlined color="white"/>
                 <Chip v-if="launch.static_fire_date_utc" :text="'Static Fire: ' + launch.static_fire_date_utc.split('T')[0] + ', At: ' + launch.static_fire_date_utc.split('T')[1]" outlined color="white"/>
              </div>
              <div v-if="launch.fairings">
                <hr/>
                <h3>Fairings</h3>
                <p>Re-used: {{ launch.fairings.reused }}</p>
                <p>Recovery Attempted: {{ launch.fairings.recovery_attempt }}</p>
                <p>Recovered: {{ launch.fairings.recovered }}</p>
                <div style="display: flex;">
                  <Chip v-for="(s,i) in launch.fairings.ships" :key="i" :text="'Ship ' + (i+1)" selectable outlined @click="router.push('/map/'+s)" color="white"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-text" v-if="launch.crew.length > 0">
        <hr/>
        <h3>Launch Crew</h3>
        <div style="display: flex;">
          <Chip style="margin:10px" selectable @click="router.push('/crew/'+c.crew)" v-for="(c,i) in launch.crew" :key="i" :text="c.role" outlined color="white"/>
        </div>
      </div>
      <div class="content-text">
        <hr/>
        <h3>Failures</h3>
        <Chip v-if="launch.failures.length == 0" text="None" outlined color="green"/>
        <div style="display:flex">
          <div v-for="(f,i) in launch.failures" :key="i" class="failureBox">
            <p>Time: {{ f.time }}s</p>
            <p>Altitude: {{ f.altitude }}</p>
            <p>Reason: {{ f.reason }}</p>
          </div>
        </div>
      </div>
      <div class="content-text">
        <hr/>
        <h3>Links</h3>
        <div style="display:flex">
          <h4 style="margin:10px"><a :href="launch.links.presskit">Press Kit</a></h4>
          <h4 style="margin:10px"><a :href="launch.links.wikipedia">Wikipedia Page</a></h4>
          <h4 style="margin:10px"><a :href="launch.links.article">Article</a></h4>
          <h4 style="margin:10px"><a :href="launch.links.webcast">Youtube</a></h4>
        </div>
      </div>
      <div class="content-text" v-if="launch.links.flickr.original.length > 0">
        <hr/>
        <h3>Images</h3>
        <carousel :items-to-show="3">
          <slide v-for="(img,i) in launch.links.flickr.original" :key="i">
            <img :src="img" class="content-image"/>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>
    </div>
  </main>
</template>

<style scoped>

.launchInfoBox{
  margin-top:40px;
  position: absolute;
  margin: auto;
  width:90vw;
  height: fit-content;
  max-height:90vh;
  left:0;right:0;top:0;bottom:0;
  border-left:2px solid orange;
  background-color: rgba(12,12,12,0.9);
  overflow-y: scroll;
  box-shadow: 0 0 15px black;

}
.launchInfoBox .generalDesc{
  display:grid;
  grid-template-columns: 300px auto;
}
.generalDesc img{
  width: 100%;
}
.content-text{
  padding:10px
}
.content-image{
  width:600px;
  height: 300px;
  object-fit: cover;
}
.failureBox{
  border:1px solid red;
  padding:5px;
  color:red;
}
</style>