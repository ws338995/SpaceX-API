<script setup>
import { ref, onMounted, watch, onUpdated } from 'vue'
import axios from 'axios';
import { userStore } from '../stores/user';
import { useRouter, useRoute } from 'vue-router'
import router from '../router';
import Chip from '../components/Chip.vue';
import Map from '../components/Map.vue';
import AllSites from '../components/AllSites.vue';
import SiteInfo from '../components/SiteInfo.vue'

const route = useRoute();
const usr = userStore();

const map = ref()

let loadedLandpads = ref(false);
let loadedLaunchpads = ref(false);
let loadedShips = ref(false);

let loadedSpecific = ref(false);

let landingPads = ref();
let launchPads = ref();
let ships = ref();

const showDisclaimer = ref(true);


let siteSelected = ref(null);

function loadData(id){
    axios.get('https://api.spacexdata.com/v4/landpads/')
    .then(function (response) {
      // handle success
      landingPads.value = response.data;
      loadedLandpads.value = true;
    })
    axios.get('https://api.spacexdata.com/v4/launchpads/')
    .then(function (response) {
      // handle success
      launchPads.value = response.data;
      loadedLaunchpads.value = true;
    })
    axios.get('https://api.spacexdata.com/v4/ships/')
    .then(function (response) {
      // handle success
      ships.value = response.data;
      loadedShips.value = true;
    })
    if(id){
      // we dont know if the ID is for a launchpad or landpad, so check both
      axios.get('https://api.spacexdata.com/v4/launchpads/' + id)
      .then(function (response) {
        // handle success
        siteSelected.value = response.data;
        loadedSpecific.value = true;
      }).catch(function (response){
        if(response.response.status == 404){
          axios.get('https://api.spacexdata.com/v4/landpads/' + id)
          .then(function (response) {
            // handle success
            siteSelected.value = response.data;
            loadedSpecific.value = true;
          }).catch(function (response){
            axios.get('https://api.spacexdata.com/v4/ships/' + id)
            .then(function (response) {
              // handle success
              siteSelected.value = response.data;
              loadedSpecific.value = true;
            })
          })
        }
      })
    }
}

function selectSite(site){
  map.value.selectSite(site);
}

onMounted(() => {
  loadData(route.params.id);
})

watch(route, () =>{loadData(route.params.id)})

</script>

<template>
  <main>
    <SiteInfo v-if="siteSelected" :site="siteSelected"/>
    <AllSites v-if="loadedLandpads && loadedLaunchpads && loadedShips"
      @select-site="selectSite"
      :land-sites="landingPads" 
      :ships="ships"
      :launch-sites="launchPads"/>
    <Map ref="map" 
      :launch-sites="launchPads" 
      :ships="ships"
      :landing-sites="landingPads" 
      :defaultSelectedSite="siteSelected" 
      @select-site="(s)=>siteSelected = s"/>
    <div class="disclaimer" v-if="showDisclaimer">
          <p>There is no Geo Location data for some ships, so they will be placed somewhere random along around the US East Coast!
              <span class="material-symbols-outlined closeBtn" @click="()=>{showDisclaimer = false;}">
                  close
              </span>
          </p>
      </div>
  </main>
</template>

<style scoped>
.landingPadsInfoBox{
  position: absolute;
  margin: auto;
  width:90vw;
  max-width: 500px;
  height:fit-content;
  left:0;right:0;top:0;bottom:0;
  border-left:2px solid orange;
  background-color: rgba(12,12,12,0.9);
}
.landingPadsInfoBox img{
  width: 100%;

}
.content-text{
  padding-left:10px
}

.disclaimer{
    position:absolute;
    margin:auto;
    bottom:10px;
    right:0;left:0;
    width: fit-content;
    border-bottom:1px solid orange;
    padding:5px;
    background-color:rgba(12, 12, 12, 0.4);

}
.disclaimer *{
    display:inline-block;
    vertical-align:top;
}
.disclaimer .closeBtn:hover{
    cursor:pointer;
    color:orange;
}
</style>