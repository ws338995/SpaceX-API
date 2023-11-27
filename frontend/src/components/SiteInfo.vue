<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
import Chip from './Chip.vue';
import { useRouter, useRoute } from 'vue-router'

const usr = userStore();
const router = useRouter();

function percColor(num){
  if(num > 85){return 'green'}
  else if(num > 60){return 'orange'}
  else if(num > 30){return 'rgb(170, 82, 12)'}
  else{return 'red'}
}
const props = defineProps({
  site: Object,
})

</script>

<template>
  <div class="info">
    <div class="shipImg" v-if="props.site.image">
      <div class="grad"></div>
      <Chip style="position:absolute; top:10px; right: 10px;" v-if="props.site.active" text="Active" color="green" />
      <Chip style="position:absolute; top:10px; right: 10px;" v-else text="Inactive" color="red" />
      <h1 style="position:absolute; bottom:10px; left: 10px;">{{ props.site.name }}</h1>
      <img alt="image" :src="props.site.image"/>
    </div>
    <div class="content-text" v-if="!props.site.image">
      <h1 style="display:inline-block">{{ props.site.name }}</h1>
      <p>{{ props.site.full_name }}</p>
      <div style="position:absolute; top:10px; right :10px">
        <Chip v-if="props.site.status == 'active'" text="Active" color="green" outlined/>
        <Chip v-else-if="props.site.status == 'inactive'" text="Inactive" color="grey" outlined/>
        <Chip v-else-if="props.site.status == 'under construction'" text="Under Construction" color="orange" outlined/>
        <Chip v-else-if="props.site.status == 'lost'" text="Lost" color="red" outlined/>
        <Chip v-else-if="props.site.status == 'retired'" text="Retired" color="grey" outlined/>
        <Chip v-else-if="props.site.status == 'unknown'" text="Unknown" color="grey" outlined/>

        <Chip v-else-if="props.site.active" text="Active" color="green" outlined/>
        <Chip v-else-if="!props.site.active" text="Inactive" color="red" outlined/>
      </div>
    </div>
    <div class="content-text">
      <p v-if="props.site.timezone">Timezone: <b>{{ props.site.timezone }}</b></p>
      <p v-if="props.site.locality">Locality: <b>{{ props.site.locality }}</b></p>
      <p v-if="props.site.region">Region: <b>{{ props.site.region }}</b></p>
      <p v-if="props.site.type">Type: <b>{{ props.site.type }}</b></p>
    </div>
    <div class="content-text" v-if="props.site.home_port">
      <Chip v-for="(r,i) in props.site.roles" :key="i" :text="r" outlined color="orange"/>
      <p v-if="props.site.imo">IMO: <b>{{ props.site.imo }}</b></p>
      <p v-if="props.site.mmsi">MMSI: <b>{{ props.site.mmsi }}</b></p>
      <p v-if="props.site.abs">ABS: <b>{{ props.site.abs }}</b></p>
      <p v-if="props.site.status">Status: <b>{{ props.site.status }}</b></p>
      <p v-if="props.site.class">Class: <b>{{ props.site.class }}</b></p>
      <p v-if="props.site.mass_kg">Mass: <b>{{ props.site.class }}</b></p>
    </div>
    <hr v-if="props.site.rockets"/>
    <div class="content-text" v-if="props.site.rockets">
      <h3>Rockets</h3>
      <div style="display: flex; flex-wrap:wrap;">
        <Chip style="margin:10px" selectable @click="router.push('/rocket/'+r)" v-for="(r,i) in props.site.rockets" :key="i" :text="'Rocket '+(i+1)" outlined color="white"/>
      </div>
    </div>
    <hr/>
    <div class="content-text" v-if="props.site.launches">
      <h3>Launches</h3>
      <div style="display: flex; flex-wrap:wrap;">
        <Chip style="margin:10px" selectable @click="router.push('/launch/'+l)" v-for="(l,i) in props.site.launches" :key="i" :text="'Launch '+(i+1)" outlined color="white"/>
      </div>
    </div>
    <hr/>
  </div>
</template>

<style scoped>
.info{
  z-index: 4;
  width:90vw;
  max-width: 400px;
  height: 80vh;
  background-color: rgba(12,12,12,0.7);
  position:absolute;
  right: 2vw;
  top:5vh;
  border-right:2px solid rgba(170, 120, 12,1);
  overflow-y: scroll;
}
.btn{
    padding:5px;
    transition:0.2s;
}
.btn:hover{
    color:white;
    cursor: pointer;
}
h3{
  color:#464646;
}
b{
  font-weight: 600;
}
.content-text{
  margin: 10px 0;
  padding:15px;

}

.shipImg{
  width:100%;
  height: fit-content;
  position: relative;
}

.shipImg img{
  width:100%;
  object-fit: cover;
}
.shipImg .grad{
  position: absolute;
  left:0;top:0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(138, 106, 58, 0) ,rgb(0, 0, 0,0.7),rgb(0, 0, 0));
}
</style>