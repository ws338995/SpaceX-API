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

let core = ref();

function loadData(id){
  axios.get('https://api.spacexdata.com/v4/cores/'+id)
  .then(function (response) {
    // handle success
    core.value = response.data;
    loaded.value = true;
  })

  console.log(core.value);
}

onMounted(() => {
  loadData(route.params.id);
})
watch(route, () =>{loadData(route.params.id)})

</script>

<template>
  <main>
    <div v-if="loaded" class="coreInfoBox">
      <div class="content-text">
        <h3 style="display:inline-block">Serial Number: {{ core.serial }}</h3>
        <div style="display:inline-block; float:right; display:flex">
          <Chip v-if="core.status == 'active'" text="Active" color="green" outlined/>
          <Chip v-else-if="core.status == 'inactive'" text="Inactive" color="grey" outlined/>
          <Chip v-else-if="core.status == 'expended'" text="Exprended" color="orange" outlined/>
          <Chip v-else-if="core.status == 'lost'" text="Lost" color="red" outlined/>
          <Chip v-else-if="core.status == 'retired'" text="Retired" color="grey" outlined/>
          <Chip v-else text="Unknown" color="grey" outlined/>
        </div>
      </div>
      <hr/>
      <div class="content-text">
        <h3>General Information</h3>
        
        <p>Last Update: {{ core.last_update }}</p>

        <p>Block: {{ core.block }}</p>
        <p>Reuse Count: {{ core.reuse_count }}</p>
        <p>RTLS Attemps: {{ core.rtls_attempts }}</p>
        <p>RTLS Landings: {{ core.rtls_landings }}</p>
        <p>ASDS Attemps: {{ core.asds_attempts }}</p>
        <p>ASDS Landings: {{ core.asds_landings }}</p>
      </div>
      <hr/>
      <div class="content-text" v-if="core.launches">
        <h3>Launches</h3>
        <div style="display:flex; flex-wrap: wrap;">
          <Chip selectable @click="router.push('/launch/'+l)" v-for="(l,i) in core.launches" :key="i" :text="'Launch '+(i+1)" outlined color="white"/>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.coreInfoBox{
  position: absolute;
  margin: auto;
  width:90vw;
  max-width: 500px;
  height:fit-content;
  left:0;right:0;top:0;bottom:0;
  border-left:2px solid orange;
  background-color: rgba(12,12,12,0.9);
}
.coreInfoBox img{
  width: 100%;

}
.content-text{
  padding-left:10px
}
</style>